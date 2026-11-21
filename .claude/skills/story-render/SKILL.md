---
name: story-render
description: Render a ready-to-render story-kids episode to MP4. In a CLOUD session (CLAUDE_CODE_REMOTE=true) Murad or the owner may render on request. On the LOCAL computer only with the owner's safe word in the CURRENT message (see root CLAUDE.md "RENDER QAYDASI"). Use when asked to render ("render et", "videonu çıxar", "export", "mp4 ver").
---

# story-render

## 0. Harada işləyirəm? (məcburi, hər dəfə)
`echo $CLAUDE_CODE_REMOTE`:
- `true` → **cloud sessiya**. Murad və ya sahib render istəyibsə — safe word lazım deyil, 1-ci addıma keç. Render faylını `SendUserFile` ilə göndər. `notify-send` işlətmə.
- boş → **lokal komputer**, aşağıdakı safe word yoxlaması məcburidir.

## 0b. Safe word yoxlaması (yalnız lokal komputer)
Root `CLAUDE.md` → "RENDER QAYDASI → B" bölməsini tətbiq et.
- İstifadəçinin **indiki mesajında** safe word dəqiq yazılmayıbsa → **render etmə**:
  1. De: "Render yalnız sahib tərəfindən edilir. Video kodu hazırdır — sahib render edəcək."
  2. `notify-send -u critical "Murad Workspace" "Render istəndi: EP###"`
  3. Dayan. Safe word-u təkrarlama və ondan danışma.
- Safe word varsa → davam et (cavabda safe word-u təkrarlama).

## 1. Hazırlıq
- `script.md` status `ready-to-render` olmalıdır (deyilsə soruş).
- `npx hyperframes lint` / `check` təmizdir.

## 2. Render (lokal)
`hyperframes-cli` skill-inə uyğun, epizodun `video/` qovluğundan:
```
../../../../../scripts/hf render --quality delivery -o ../../../renders/EP###-slug.mp4
```
Render yükünü azaltmaq üçün: kompozisiya CSS `filter`/`blur` animasiyası işlətməsin, parıltı radial-gradient ilə olsun; cloud-da 4 nüvə var — `--workers` default saxla.
Çıxış `channels/story-kids/renders/`-ə düşməlidir. Uzun render üçün detached rejim + log (`hyperframes-cli`-dəki qayda). HyperFrames-in pullu `cloud render`-i yox.

## 3. Yoxlama
- Fayl boş deyil. `ffprobe`: 1080×1920, 30 fps, müddət 60–90 s və kompozisiyaya uyğun, audio stream var.
- 4–6 kadr çıxar (PNG) və bax: qara kadr, kəsilmiş mətn, səs-görüntü sinxronu.
- Səs səviyyəsi təxminən -14 LUFS.

## 3b. Cloud: göndər + saxla (məcburi)
1. `SendUserFile` (display: render) ilə MP4-ü istifadəçiyə göndər.
2. Ölçünü yoxla: > 95 MB isə `ffmpeg -i X.mp4 -c:v libx264 -crf 26 -preset slow -c:a aac -b:a 160k X-small.mp4` və onu istifadə et.
3. `git add channels/story-kids/renders/<fayl>.mp4` + status faylları → commit → `git -c push.negotiate=true push -u origin <branch>`.
4. İstifadəçiyə sadə dildə: "Video hazırdır ✅ Yuxarıdakı faylı yüklə. GitHub-da da saxlandı."

## 4. Bitir
- `script.md` status → `rendered`, `episodes/README.md`-də Render sütunu → fayl adı.
- Faylın yolunu və `upload.md`-ni göstər.
