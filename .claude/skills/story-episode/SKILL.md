---
name: story-episode
description: Start a new story-kids episode from Murad's topic and write the English script (60-90s, kids 8-12, mysterious/fantastic). Use when Murad gives a topic or idea ("yeni hekayə", "bu mövzuda ssenari yaz", "new episode", "ssenari"), or asks to revise an episode script. Ends when Murad approves the script.
---

# story-episode — mövzudan təsdiqlənmiş ssenariyə

Əvvəlcə oxu: `channels/story-kids/CLAUDE.md`, `channels/story-kids/style/STYLE.md`, `channels/story-kids/assets/characters/` (sabit qəhrəmanlar).
Murad ilə **Azərbaycanca** danış; ssenari **ingiliscə**.

## 1. Mövzunu aydınlaşdır (qısa)
Mövzu çox ümumidirsə, maksimum 2 sual ver (məs. hansı qəhrəman? seriya olacaq?). Aydındırsa — birbaşa yaz.

## 2. Epizod qovluğu
- Növbəti nömrə: `episodes/` içindəki ən böyük `EP###` + 1.
- `episodes/EP###-<kebab-slug>/` yarat, `_template/script.md` və `upload.md`-ni kopyala.
- `ideas/topics.md`-də mövzunu `[x] … → EP###` et (yoxdursa əlavə et).
- `episodes/README.md` cədvəlinə sətir əlavə et.

## 3. 3 qısa konsept təklif et
Hər biri: başlıq + 1 cümlə logline + hook cümləsi. Murad birini seçir (və ya "sən seç").

## 4. Ssenarini yaz (`script.md`)
- Struktur: Hook (0–3s) → Quruluş → Macəra (2–3 dönüş) → Kulminasiya → Cliffhanger/sual.
- 60–90 san: 140–230 söz. Cümlə ≤ 12 söz. 8–12 yaş söz ehtiyatı.
- Hər sətir: vaxt, narrator mətni, ekran mətni (az), vizual/animasiya təsviri (kodla qurula bilən!), SFX/musiqi.
- Vizual təsvirlər **kodla həyata keçirilə bilən** olsun (SVG obraz, parallax fon, zərrəcik, glow, kamera zoom/pan, Three.js obyekt). Fotoreal və ya mürəkkəb insan hərəkəti yazma.
- Sabit qəhrəmanları kartoçkalarına uyğun istifadə et. Yeni obraz lazımdırsa — `NEW CHARACTER:` kimi qeyd et.
- Uşaq təhlükəsizliyi qaydalarını yoxla (kanal CLAUDE.md).
- Söz sayı və təxmini müddəti sonda yaz. Frontmatter: `status: script-draft`.

## 5. Muradə göstər
Ssenarini oxunaqlı formada göstər: başlıq, logline, narration mətni bütöv, sonra səhnə cədvəli. Azərbaycanca qısa xülasə əlavə et (Murad ingiliscəni tam başa düşməyə bilər).
Soruş: "Təsdiqləyirsən, yoxsa düzəliş?"

## 6. Düzəliş dövrü
Hər düzəlişdən sonra yenidən göstər. Köhnə versiyanı `script.v1.md` kimi saxla.

## 7. Təsdiq
Murad aydın şəkildə təsdiqləyəndə: `status: script-approved`, `approved_by_murad: true`, tarix.
Sonra təklif et: "Video kodunu qurmağa başlayım?" → `story-build` skill-i.
