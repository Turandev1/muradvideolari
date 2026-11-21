#!/usr/bin/env bash
# Murad Workspace — alətləri qurur (cloud sessiya və ya təzə komputer). Idempotentdir.
# İstifadə: bash scripts/cloud-setup.sh
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
T="$ROOT/.tools"
HF_VER="0.9.77"
mkdir -p "$T" "$T/hf-cache"

echo "▸ Node paketləri (HyperFrames $HF_VER, GSAP, OFL fontlar) → .tools/node_modules"
[ -f "$T/package.json" ] || echo '{"name":"murad-tools","private":true}' > "$T/package.json"
if [ ! -x "$T/node_modules/.bin/hyperframes" ] || ! "$T/node_modules/.bin/hyperframes" --version 2>/dev/null | grep -q "$HF_VER"; then
  (cd "$T" && npm i --no-audit --no-fund "hyperframes@$HF_VER" gsap@3.15.0 @fontsource/lilita-one @fontsource/baloo-2 >/dev/null)
fi

echo "▸ Python venv + Kokoro TTS → .tools/venv"
[ -x "$T/venv/bin/python" ] || python3 -m venv "$T/venv"
"$T/venv/bin/python" -c "import kokoro_onnx, soundfile, numpy" 2>/dev/null || "$T/venv/bin/pip" install -q kokoro-onnx soundfile numpy

echo "▸ Kokoro modeli (ilk TTS çağırışı yükləyir) → .tools/hf-cache"
if [ ! -f "$T/hf-cache/tts/models/kokoro-v1.0.onnx" ]; then
  "$ROOT/scripts/hf" tts "Hello." -o "$T/hf-cache/warmup.wav" >/dev/null && rm -f "$T/hf-cache/warmup.wav"
fi

echo "▸ Parakeet (söz vaxtları) — şəbəkə icazə verirsə"
"$ROOT/scripts/hf" models install parakeet >/dev/null 2>&1 && echo "  parakeet ok" || echo "  parakeet yüklənmədi (huggingface bağlıdır) — tools/word_times.py istifadə et"

echo "▸ Yoxlama"
"$ROOT/scripts/hf" doctor 2>&1 | grep -E "Chrome|FFmpeg|TTS" || true
echo "✓ Hazırdır. HyperFrames: scripts/hf <əmr>"
