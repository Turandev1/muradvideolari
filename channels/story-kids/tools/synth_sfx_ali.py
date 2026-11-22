"""Original SFX for EP001 (swish, snatch, tummy grumble, soft steps). Generated from code -> CC0 by us.
Usage: python synth_sfx_ali.py <out_dir>"""
import sys, numpy as np, soundfile as sf
SR = 44100
rng = np.random.default_rng(11)
def T(d): return np.arange(int(d*SR))/SR
def lp(x, k):
    return np.convolve(x, np.ones(k)/k, mode="same") if k > 1 else x
def swish(d=0.7):
    t = T(d); n = rng.standard_normal(len(t)); n = lp(n, 6)-lp(n, 60)
    env = np.sin(np.pi*np.clip(t/d,0,1))**2
    return (0.35*n[:len(t)]*env).astype(np.float32)
def snatch(d=0.35):
    t = T(d); n = lp(rng.standard_normal(len(t)), 4)
    env = np.exp(-t*18)*np.minimum(1, t/0.004)
    pop = np.sin(2*np.pi*(300-500*t)*t)*np.exp(-t*25)
    return (0.5*(0.6*n*env+0.5*pop)).astype(np.float32)
def grumble(d=1.6):
    t = T(d); f = 70+25*np.sin(2*np.pi*2.2*t)
    s = np.sin(2*np.pi*np.cumsum(f)/SR)+0.5*np.sin(4*np.pi*np.cumsum(f)/SR)
    s *= (0.55+0.45*np.sin(2*np.pi*3.1*t))*np.minimum(1, t/0.2)*np.minimum(1, (d-t)/0.3)
    return (0.4*s).astype(np.float32)
def steps(d=2.4, gap=0.55):
    out = np.zeros(int(d*SR), np.float32); k = 0
    while k*gap < d-0.15:
        i = int(k*gap*SR); t = T(0.12); b = (np.sin(2*np.pi*110*t)+0.4*lp(rng.standard_normal(len(t)), 8))*np.exp(-t*40)
        out[i:i+len(b)] += (0.35*b[:len(out)-i]).astype(np.float32); k += 1
    return out*np.minimum(1, (d-T(d))/0.5)
o = sys.argv[1]
for n, a in [("swish", swish()), ("snatch", snatch()), ("grumble", grumble()), ("steps", steps())]:
    sf.write(f"{o}/{n}.wav", a, SR)
