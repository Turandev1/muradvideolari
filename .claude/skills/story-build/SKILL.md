---
name: story-build
description: Build the HyperFrames video code for an approved story-kids episode - Kokoro voiceover, free music/SFX, 2D SVG characters and scenes (sometimes 3D), 9:16 composition, preview and frame snapshots. Use after a script is approved ("videonu qur", "kodunu yaz", "build the video", "animasiyanı hazırla"). Does NOT render.
---

# story-build — təsdiqlənmiş ssenaridən video koduna

**Şərt:** `script.md`-də `status: script-approved`. Deyilsə — dayan və `story-episode`-a qayıt.
Əvvəlcə oxu: kanal `CLAUDE.md`, `style/STYLE.md`, istifadə olunan qəhrəmanların `character.md`-ləri.
Sonra `hyperframes` skill-ini yüklə (render müqaviləsi, iş dövrü), lazım olduqca `hyperframes-cli`, `hyperframes-registry`, `media-use`.

## Qaydalar
- **Yalnız pulsuz/lokal:** TTS = `npx hyperframes tts` (Kokoro). Musiqi/SFX = CC0/Openverse/bundled/lokal. HeyGen sign-in, pullu kredit, cloud — yox. `media-use` → `--local-only`.
- **Render etmə.** Bu skill `ready-to-render`-də bitir. Render = `story-render` (sahib).
- Kompozisiya: **1080×1920, 30 fps**, müddət ssenariyə uyğun (60–90 s).
- Obrazlar kodla: SVG, hissələr ayrı qruplarda, idle animasiya (nəfəs, göz qırpma). 3D lazım olsa Three.js.
- Sabit qəhrəman yoxdursa və ya yeni obraz lazımdırsa: `assets/characters/<ad>/`-də yarat (kartoçka + SVG) və kataloqa əlavə et — epizod qovluğunda yox, ki təkrar istifadə olunsun.

## Addımlar
1. `script.md` status → `building`.
2. HyperFrames layihəsi: `episodes/EP###-slug/video/` (`npx hyperframes init` və ya skill-in tövsiyə etdiyi yol). Asset-lərə nisbi yolla istinad et və ya `video/assets/`-ə kopyala (renderdə fetch olmamalıdır).
3. **Səs:** TTS-dən əvvəl hər sətrin fonemlərini yoxla: `.tools/venv/bin/python -I -c "from kokoro_onnx.tokenizer import Tokenizer; print(Tokenizer().phonemize('<mətn>','en-us'))"`. Nida, emosiya və səs-sözlər (`Shh`, `Hmm`, `Psst`, gülüş, ah, nəfəs) **Kokoro ilə səsləndirilmir** (espeak onları hərf-hərf oxuyur, ya da effekt vermir): onları SFX ilə ver (bundled/CC0 və ya lokal yaradılmış — `CREDITS.md`-yə yaz); inandırıcı SFX alınmırsa — ssenaridən çıxar və Muradə de. Tək qısa sözü ayrıca səsləndirmə (Kokoro əvvəlinə sait əlavə edir) — cümlə içində yarat, fasiləni ffmpeg ilə əlavə et. Sonra hər narration sətri üçün Kokoro TTS → `video/assets/vo/`. Səs adını `STYLE.md` və frontmatter-dən götür (yoxdursa 2–3 nümunə səsi Muradə təklif et). Sətir müddətlərini ölç (`ffprobe`) və səhnə vaxtlarını səsə uyğunlaşdır.
4. **Musiqi + SFX:** pulsuz mənbədən, `assets/music|sfx`-ə saxla, `CREDITS.md`-yə yaz. Musiqi narratordan -18…-22 dB aşağı.
5. **Səhnələr:** hər ssenari sətri = səhnə. Hook ilk kadrda hərəkətlə başlasın. Hər 5–8 s vizual dəyişiklik. Platform UI zonalarını (yuxarı 12%, aşağı 20%) boş saxla.
6. **Yoxla:** `npx hyperframes lint` / `check`, sonra `snapshot` ilə açar anlardan PNG kadrlar. Kadrlara özün bax (kompozisiya, oxunaqlılıq, obraz ardıcıllığı).
7. **Muradə göstər:** `npx hyperframes preview --background` linki (Remote Control-da açılmaya bilər) + 4–6 snapshot PNG. Düzəliş istəyərsə — təkrar.
8. `upload.md`-ni doldur (EN: title, description, hashtag-lar, Made for Kids: Yes, CC-BY kreditlər).
9. Status → `ready-to-render`, `episodes/README.md`-ni yenilə. De: "Video kodu hazırdır. Render-i sahib edəcək." Render-ə özün başlama.
