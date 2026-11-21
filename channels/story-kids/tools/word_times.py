"""Approximate word timings for one TTS line, without a speech model.

Spreads the voiced span across words by letter count (+ pause after punctuation),
then snaps each boundary to the nearest energy dip. Good enough for one-word-at-a-time
captions and simple lip-sync. Use Parakeet (`scripts/hf transcribe`) when it is available.

Usage: python word_times.py line.wav "The text that was spoken." [offset_s]
Prints JSON: [{"w": "The", "s": 0.03, "e": 0.21}, ...]  (times + offset)
"""
import json, re, sys
import numpy as np
import soundfile as sf


def word_times(wav, text, offset=0.0, min_word=0.16):
    x, sr = sf.read(wav)
    if x.ndim > 1:
        x = x.mean(1)
    hop = int(sr * 0.01)
    e = np.array([np.sqrt(np.mean(x[i:i + hop] ** 2)) for i in range(0, len(x) - hop, hop)])
    voiced = np.where(e > e.max() * 0.04)[0]
    s, en = int(voiced[0]), int(voiced[-1])
    words = text.split()
    w = np.array([len(re.sub(r"[^A-Za-z']", "", t)) + 1.5 + (3 if re.search(r"[.,!?…]$", t) else 0) for t in words], float)
    b = s + np.concatenate([[0], np.cumsum(w)]) / w.sum() * (en - s)
    for i in range(1, len(b) - 1):
        c = int(b[i]); lo, hi = max(s, c - 12), min(en, c + 12)
        b[i] = lo + int(np.argmin(e[lo:hi]))
    t = b * 0.01
    # enforce a minimum on-screen time per word (captions must be readable)
    for i in range(1, len(t) - 1):
        t[i] = max(t[i], t[i - 1] + min_word)
    return [{"w": words[i], "s": round(t[i] + offset, 2), "e": round(t[i + 1] + offset, 2)} for i in range(len(words))]


if __name__ == "__main__":
    off = float(sys.argv[3]) if len(sys.argv) > 3 else 0.0
    print(json.dumps(word_times(sys.argv[1], sys.argv[2], off)))
