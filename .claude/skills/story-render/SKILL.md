---
name: story-render
description: Render a ready-to-render story-kids episode to MP4. Locally only allowed when the user's CURRENT message contains the owner's safe word (see root CLAUDE.md "RENDER QAYDASI"); in a Claude cloud session (CLAUDE_CODE_REMOTE=true) the owner or Murad may render without it. Use when asked to render ("render et", "videonu çıxar", "export", "mp4 ver"). Without the safe word, do not render - reply that only the owner renders and notify the owner.
---

# story-render

## 0. Cloud yoxsa lokal?
`echo "$CLAUDE_CODE_REMOTE"` → `true`-dursa sessiya **cloud**-dadır: sahib və ya Murad safe word olmadan render edə bilər, 1-ci addıma keç (`scripts/setup-cloud.sh` işləyib-işləmədiyini yoxla). Boşdursa — lokaldır, aşağıdakı safe word yoxlaması məcburidir.

## 0.1 Safe word yoxlaması (lokal, məcburi, hər dəfə)
Root `CLAUDE.md` → "RENDER QAYDASI" bölməsini tətbiq et.
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
npx hyperframes render --quality delivery -o ../../../renders/EP###-slug.mp4
```
Çıxış `channels/story-kids/renders/`-ə düşməlidir. Uzun render üçün detached rejim + log (`hyperframes-cli`-dəki qayda). HyperFrames-in pullu `cloud render`-i yox.

## 3. Yoxlama
- Fayl boş deyil. `ffprobe`: 1080×1920, 30 fps, müddət 60–90 s və kompozisiyaya uyğun, audio stream var.
- 4–6 kadr çıxar (PNG) və bax: qara kadr, kəsilmiş mətn, səs-görüntü sinxronu.
- Səs səviyyəsi təxminən -14 LUFS.

## 4. Bitir
- `script.md` status → `rendered`, `episodes/README.md`-də Render sütunu → fayl adı.
- Faylın yolunu və `upload.md`-ni göstər.
