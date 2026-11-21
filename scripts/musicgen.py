"""Lokal MusicGen (facebook/musicgen-small, CC-BY-NC weights; output music is ours to use per Meta's terms — see CREDITS).
İstifadə: python musicgen.py "<prompt>" <seconds> <out.wav> [seed]"""
import sys, torch, numpy as np, soundfile as sf
from transformers import AutoProcessor, MusicgenForConditionalGeneration
prompt, secs, out = sys.argv[1], float(sys.argv[2]), sys.argv[3]
seed = int(sys.argv[4]) if len(sys.argv) > 4 else 7
torch.manual_seed(seed)
proc = AutoProcessor.from_pretrained("facebook/musicgen-small")
model = MusicgenForConditionalGeneration.from_pretrained("facebook/musicgen-small")
inp = proc(text=[prompt], padding=True, return_tensors="pt")
with torch.no_grad():
    audio = model.generate(**inp, do_sample=True, guidance_scale=3.0, max_new_tokens=int(secs * 50) + 10)
sr = model.config.audio_encoder.sampling_rate
sf.write(out, audio[0, 0].cpu().numpy().astype(np.float32), sr)
print("wrote", out, sr, audio.shape[-1] / sr)
