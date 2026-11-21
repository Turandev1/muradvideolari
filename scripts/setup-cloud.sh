#!/usr/bin/env bash
# Murad Workspace — Claude cloud sessiyası üçün alət quraşdırma.
# Yalnız pulsuz/open-source: HyperFrames (npx), Chrome (HyperFrames idarə edir),
# ffmpeg, Kokoro TTS (kokoro-onnx, Python venv), Parakeet transkripsiya.
#
# SessionStart hook avtomatik işlədir. Əl ilə: bash scripts/setup-cloud.sh [--force]
# Lokal komputerdə heç nə etmir (orada alətlər artıq qurulub) — --force ilə məcbur et.
set -uo pipefail

ROOT="${CLAUDE_PROJECT_DIR:-$(cd "$(dirname "$0")/.." && pwd)}"
cd "$ROOT"

if [[ "${CLAUDE_CODE_REMOTE:-}" != "true" && "${1:-}" != "--force" ]]; then
  exit 0   # lokal sessiya — toxunma
fi

TOOLS="$ROOT/.tools"
VENV="$TOOLS/venv"
CACHE="$TOOLS/hf-cache"
LOG="$TOOLS/setup-cloud.log"
mkdir -p "$TOOLS" "$CACHE"
chmod 700 "$CACHE"            # HyperFrames qrup-yazılan cache-i rədd edir
exec 3>&1 >>"$LOG" 2>&1
say() { echo "[setup-cloud] $*" >&3; echo "[setup-cloud] $*"; }

SUDO=""; [[ $EUID -ne 0 ]] && command -v sudo >/dev/null && SUDO="sudo -n"

# 1) Sistem paketləri: ffmpeg + Chrome-un headless asılılıqları + python venv
need_apt=()
command -v ffmpeg  >/dev/null || need_apt+=(ffmpeg)
command -v python3 >/dev/null || need_apt+=(python3)
python3 -c "import venv, ensurepip" 2>/dev/null || need_apt+=(python3-venv)
command -v espeak-ng >/dev/null || need_apt+=(espeak-ng)
if ((${#need_apt[@]})) && command -v apt-get >/dev/null; then
  say "apt: ${need_apt[*]}"
  $SUDO apt-get update -qq || true
  $SUDO apt-get install -y -qq --no-install-recommends "${need_apt[@]}" \
    libnss3 libatk-bridge2.0-0 libgbm1 libxkbcommon0 libasound2t64 libgtk-3-0 fonts-dejavu-core \
    || $SUDO apt-get install -y -qq --no-install-recommends "${need_apt[@]}" || true
fi

# 2) Node / HyperFrames CLI
if ! command -v node >/dev/null; then say "XƏTA: node yoxdur"; exit 0; fi
HF_VER="0.9.77"
npx -y "hyperframes@${HF_VER}" --version >/dev/null && say "hyperframes ${HF_VER} hazır"

# 3) Kokoro TTS üçün Python venv
if ! "$VENV/bin/python" -c "import kokoro_onnx, soundfile" 2>/dev/null; then
  say "Python venv + kokoro-onnx quraşdırılır"
  python3 -m venv "$VENV"
  "$VENV/bin/python" -m pip install -q --upgrade pip
  "$VENV/bin/python" -m pip install -q "kokoro-onnx>=0.4" soundfile
fi

# 4) Env-lər bütün sonrakı Bash əmrlərinə (settings.json-dakı lokal yolları əvəz edir)
if [[ -n "${CLAUDE_ENV_FILE:-}" ]]; then
  {
    echo "export HYPERFRAMES_PYTHON='$VENV/bin/python'"
    echo "export HYPERFRAMES_CACHE_DIR='$CACHE'"
  } >> "$CLAUDE_ENV_FILE"
fi
export HYPERFRAMES_PYTHON="$VENV/bin/python" HYPERFRAMES_CACHE_DIR="$CACHE"

# 5) Render Chrome-u, Parakeet modeli və Kokoro modelini əvvəlcədən yüklə
npx -y "hyperframes@${HF_VER}" browser ensure  || true
npx -y "hyperframes@${HF_VER}" models install parakeet || true
if [[ ! -f "$CACHE/tts/models/kokoro-v1.0.onnx" ]]; then
  tmp="$(mktemp -d)"
  npx -y "hyperframes@${HF_VER}" tts "Setup check." --voice af_heart --output "$tmp/t.wav" || true
  rm -rf "$tmp"
fi

npx -y "hyperframes@${HF_VER}" doctor || true
say "hazırdır. Log: $LOG"
exit 0
