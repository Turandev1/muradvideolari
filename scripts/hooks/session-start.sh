#!/usr/bin/env bash
# SessionStart hook: cloud-da alətləri avtomatik qurur və Claude-a bələdçi rolunu xatırladır.
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
SETUP_NOTE=""
if [ "${CLAUDE_CODE_REMOTE:-}" = "true" ]; then
  if [ ! -x "$ROOT/.tools/node_modules/.bin/hyperframes" ] || [ ! -f "$ROOT/.tools/hf-cache/tts/models/kokoro-v1.0.onnx" ]; then
    if bash "$ROOT/scripts/cloud-setup.sh" > /tmp/murad-setup.log 2>&1; then
      SETUP_NOTE="Cloud alətləri avtomatik quruldu (scripts/cloud-setup.sh)."
    else
      SETUP_NOTE="Cloud alətlərinin qurulması ALINMADI — /tmp/murad-setup.log-a bax, istifadəçiyə sadə dildə de və 'bash scripts/cloud-setup.sh'-i yenidən işlət."
    fi
  else
    SETUP_NOTE="Cloud alətləri artıq qurulub."
  fi
  WHERE="cloud sessiya (render sərbəstdir)"
else
  WHERE="lokal komputer (render yalnız sahib, safe word ilə)"
fi
CTX="[murad-guide] Bu layihəni texniki olmayan istifadəçi işlədir. Mühit: $WHERE. $SETUP_NOTE İstifadəçinin İLK mesajına cavab verməzdən əvvəl murad-guide skill-ini yüklə və onun 'Sessiya başlanğıcı' addımlarını et (salam, qısa status, növbəti addım təklifi). Bütün sessiya boyu murad-guide qaydalarına əməl et."
python3 -c 'import json,sys; print(json.dumps({"hookSpecificOutput":{"hookEventName":"SessionStart","additionalContext":sys.argv[1]}}))' "$CTX"
