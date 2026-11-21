#!/usr/bin/env python3
"""UserPromptSubmit hook: sessiya kontekstinin doluluğunu ölçür, 40% və 50%-də xəbərdarlıq edir.

Son assistant cavabının `usage` sahələrindən (input + cache) real kontekst ölçüsünü götürür.
Pəncərə ölçüsü: env MURAD_CONTEXT_WINDOW (default 1 000 000). Hər hədd sessiyada bir dəfə
xəbərdarlıq edir; 60%-dən sonra hər mesajda xatırladır.
"""
import json, os, sys

def main():
    try:
        data = json.load(sys.stdin)
    except Exception:
        return
    path = data.get("transcript_path") or ""
    sid = data.get("session_id") or "x"
    if not path or not os.path.exists(path):
        return
    used = 0
    try:
        with open(path, "rb") as f:
            f.seek(0, 2); size = f.tell(); f.seek(max(0, size - 3_000_000))
            lines = f.read().decode("utf-8", "ignore").splitlines()
        for line in reversed(lines):
            if '"usage"' not in line:
                continue
            try:
                u = json.loads(line)["message"]["usage"]
            except Exception:
                continue
            used = u.get("input_tokens", 0) + u.get("cache_read_input_tokens", 0) + u.get("cache_creation_input_tokens", 0)
            break
    except Exception:
        return
    if not used:
        return
    window = int(os.environ.get("MURAD_CONTEXT_WINDOW") or 1_000_000)
    window = max(window, used)
    pct = used * 100 // window
    if pct < 40:
        return
    state = os.path.join(os.environ.get("TMPDIR", "/tmp"), f"murad-ctx-{sid}.json")
    try:
        warned = json.load(open(state))
    except Exception:
        warned = []
    level = 60 if pct >= 60 else 50 if pct >= 50 else 40
    if level in warned and level < 60:
        return
    warned.append(level)
    try:
        json.dump(warned, open(state, "w"))
    except Exception:
        pass
    msg_user = (f"⚠️ Sessiya yaddaşı ~{pct}% doludur. Yeni sessiyaya keçmək tövsiyə olunur "
                f"(işi bitirib push etdikdən sonra).")
    ctx = (f"[murad-guide] Sessiya konteksti ~{pct}% ({used:,} token) doludur. Bu cavabın ƏVVƏLİNDƏ istifadəçiyə "
           f"sadə Azərbaycan dilində qısa xəbərdarlıq et: sessiya böyüyüb, cavablar yavaşlaya və dəqiqliyi azala bilər; "
           f"hazırkı işi bitirək, hər şeyi GitHub-a push edək və yeni sessiya açaq. Yeni sessiyada nə yazacağını "
           f"(məs. 'EP001 üzərində davam edək') hazır cümlə kimi ver. Push olunmamış iş varsa əvvəlcə push et.")
    print(json.dumps({"systemMessage": msg_user,
                      "hookSpecificOutput": {"hookEventName": "UserPromptSubmit", "additionalContext": ctx}}))

if __name__ == "__main__":
    main()
