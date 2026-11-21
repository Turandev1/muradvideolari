"""Procedural music-box score + magic SFX for story-kids episodes.

100% original, generated from code (no samples) -> no licence issues (CC0 by us).
Usage: python synth_audio.py <out_dir> [duration_s]
"""
import sys, os
import numpy as np
import soundfile as sf

SR = 44100
rng = np.random.default_rng(7)  # deterministic


def t_axis(d):
    return np.arange(int(d * SR)) / SR


def midi(n):
    return 440.0 * 2 ** ((n - 69) / 12)


def music_box(f, d=2.2, amp=0.25):
    t = t_axis(d)
    env = np.exp(-t * 2.6) * np.minimum(1, t / 0.004)
    # tine partials (slightly inharmonic) -> glassy music-box colour
    s = (np.sin(2 * np.pi * f * t)
         + 0.35 * np.sin(2 * np.pi * f * 2.0 * t) * np.exp(-t * 4)
         + 0.18 * np.sin(2 * np.pi * f * 5.4 * t) * np.exp(-t * 9))
    return amp * env * s


def pad(freqs, d, amp=0.06):
    t = t_axis(d)
    att = np.minimum(1, t / 1.2) * np.minimum(1, (d - t) / 1.2)
    s = np.zeros_like(t)
    for f in freqs:
        for det in (-0.6, 0.0, 0.7):
            ff = f + det
            s += np.sin(2 * np.pi * ff * t) + 0.25 * np.sin(2 * np.pi * 2 * ff * t)
    s *= 1 + 0.15 * np.sin(2 * np.pi * 0.25 * t)
    return amp * att * s / (len(freqs) * 3)


def reverb(x, mix=0.32):
    out = x.copy()
    for dly, g in ((0.0297, .62), (0.0371, .58), (0.0411, .55), (0.0437, .52)):
        n = int(dly * SR)
        y = comb(x, n, g)  # feedback comb via block recursion
        out = out + mix * 0.25 * y[:len(x)]
    return out


def comb(x, n, g):
    y = np.zeros(len(x))
    for start in range(0, len(x), n):
        end = min(start + n, len(x))
        y[start:end] = x[start:end]
        if start - n >= 0:
            y[start:end] += g * y[start - n:end - n]
    return y


def place(buf, sig, at):
    i = int(at * SR)
    j = min(len(buf), i + len(sig))
    if i < len(buf):
        buf[i:j] += sig[:j - i]


def lowpass(x, a=0.08):
    y = np.zeros_like(x)
    acc = 0.0
    # simple one-pole, vectorised in chunks via cumulative trick is overkill; loop is fine for SFX lengths
    for i, v in enumerate(x):
        acc += a * (v - acc)
        y[i] = acc
    return y


def score(dur):
    buf = np.zeros(int(dur * SR) + SR)
    beat = 60 / 76  # gentle lullaby tempo
    # F major: F  Dm  Bb  C  (two bars each = 4 beats)
    chords = [(53, 57, 60), (50, 53, 57), (46, 50, 53), (48, 52, 55)]
    bar = 4 * beat
    k = 0
    tpos = 0.0
    while tpos < dur:
        c = chords[k % 4]
        place(buf, pad([midi(n) for n in c], bar + 1.2), tpos)
        place(buf, pad([midi(c[0] - 12)], bar + 1.2, amp=0.05), tpos)
        tpos += bar
        k += 1
    # melody (music box) — rising, curious, ends on an open question (the 2nd)
    mel = [72, 77, 76, 72, 74, None, 69, 72,
           70, 74, 72, 69, 67, None, 72, 74,
           77, 76, 74, 72, 74, None, 79, None]
    for i, n in enumerate(mel):
        at = 0.25 + i * beat * 0.5 * 1.25
        if at > dur - 1.5:
            break
        if n:
            place(buf, music_box(midi(n), amp=0.16), at)
            place(buf, music_box(midi(n + 12), amp=0.035), at + 0.01)
    # final shimmer for the end card
    for i, n in enumerate([84, 88, 91, 96]):
        place(buf, music_box(midi(n), d=3, amp=0.07), dur - 2.4 + i * 0.09)
    out = reverb(buf)[: int(dur * SR)]
    fade = np.minimum(1, np.arange(len(out)) / (0.6 * SR))
    fade *= np.minimum(1, (len(out) - np.arange(len(out))) / (1.2 * SR))
    return out * fade


def sfx_starfall():
    d = 2.6
    t = t_axis(d)
    buf = np.zeros(len(t) + SR)
    # descending sparkle pings
    for i in range(26):
        at = i * 0.085
        f = 3400 - i * 85 + rng.uniform(-60, 60)
        place(buf, music_box(f, d=0.6, amp=0.05 * (1 - i / 34)), at)
    # airy whoosh tail
    noise = rng.standard_normal(len(t))
    w = lowpass(noise, 0.12) - lowpass(noise, 0.02)
    env = np.sin(np.pi * np.clip(t / d, 0, 1)) ** 2
    buf[:len(t)] += 0.35 * w * env
    return reverb(buf, 0.4)


def sfx_sparkle():
    buf = np.zeros(int(1.8 * SR))
    for i, n in enumerate([88, 91, 95, 93, 98, 100]):
        place(buf, music_box(midi(n), d=1.2, amp=0.06), i * 0.045)
    return reverb(buf, 0.5)


def sfx_plop():
    d = 0.35
    t = t_axis(d)
    f = 380 + 900 * (t / d) ** 0.6  # rising "bloop"
    ph = 2 * np.pi * np.cumsum(f) / SR
    return 0.45 * np.sin(ph) * np.exp(-t * 14) * np.minimum(1, t / 0.003)


def sfx_whoosh(d=1.1):
    t = t_axis(d)
    noise = rng.standard_normal(len(t))
    w = lowpass(noise, 0.18) - lowpass(noise, 0.03)
    env = np.sin(np.pi * np.clip(t / d, 0, 1)) ** 3
    return 0.5 * w * env


def sfx_chime():
    buf = np.zeros(int(3.2 * SR))
    for i, n in enumerate([77, 81, 84, 89]):
        place(buf, music_box(midi(n), d=2.8, amp=0.09), i * 0.07)
    return reverb(buf, 0.5)


def sfx_crickets(d):
    # soft dusk ambience: pulsed high chirps + low pond hush
    t = t_axis(d)
    ch = np.sin(2 * np.pi * 4300 * t) * (np.sin(2 * np.pi * 28 * t) > 0.6)
    gate = (np.sin(2 * np.pi * 0.9 * t + 1) > 0.2).astype(float)
    hush = lowpass(rng.standard_normal(len(t)), 0.01)
    fade = np.minimum(1, t / 1.0) * np.minimum(1, (d - t) / 1.0)
    return (0.012 * ch * gate + 0.25 * hush) * fade


def save(path, x, stereo_width=0.0):
    x = x / max(1e-9, np.max(np.abs(x))) * 0.89 if np.max(np.abs(x)) > 0.89 else x
    sf.write(path, np.stack([x, x], 1).astype(np.float32), SR, subtype="PCM_16")


if __name__ == "__main__":
    out = sys.argv[1]
    dur = float(sys.argv[2]) if len(sys.argv) > 2 else 15
    os.makedirs(os.path.join(out, "music"), exist_ok=True)
    os.makedirs(os.path.join(out, "sfx"), exist_ok=True)
    save(os.path.join(out, "music", "lullaby-musicbox.wav"), score(dur))
    save(os.path.join(out, "sfx", "starfall.wav"), sfx_starfall())
    save(os.path.join(out, "sfx", "sparkle.wav"), sfx_sparkle())
    save(os.path.join(out, "sfx", "plop.wav"), sfx_plop())
    save(os.path.join(out, "sfx", "whoosh.wav"), sfx_whoosh())
    save(os.path.join(out, "sfx", "chime.wav"), sfx_chime())
    save(os.path.join(out, "sfx", "dusk-ambience.wav"), sfx_crickets(dur))
    print("ok")
