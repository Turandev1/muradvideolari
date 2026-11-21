---
name: story-style
description: Analyze reference videos and update the story-kids visual style guide, or add/update recurring characters and assets in the asset library. Use when reference videos are added ("referansları analiz et", "üslubu yenilə"), or when a new character, background, prop, music or SFX asset should be added ("yeni qəhrəman əlavə et", "asset əlavə et").
---

# story-style — üslub və asset kitabxanası

## A. Referans videolardan üslubu yeniləmək
1. `channels/story-kids/style/references/`-dəki videoları və qeydləri tap.
2. Hər videodan kadr çıxar (PNG, render deyil): `ffmpeg -i ref.mp4 -vf "fps=1/2,scale=540:-1" style/references/_frames/<ad>_%03d.png`. Lazım olsa `npx hyperframes transcribe` ilə səs tempi.
3. Kadrlara bax və təsvir et: rəng palitrası (hex), xətt/kontur, kölgə üslubu, obraz proporsiyası, fon dərinliyi, kamera hərəkəti, montaj tempi (kəsim/saniyə), mətn üslubu, musiqi/səs hissi.
4. **Yalnız üslub prinsiplərini** götür — referans videonun obrazlarını, loqosunu, səhnələrini kopyalama. Orijinal qal.
5. `style/STYLE.md`-ni yenilə: versiyanı artır (v1, v2…), dəyişən bölmələri yaz, "Dəyişiklik qeydi"-nə nə və hansı referansdan olduğunu əlavə et.
6. Sahib/Muradə qısa xülasə göstər (Azərbaycanca) + 2–3 nümunə kadr (`npx hyperframes snapshot` ilə yeni üslubda kiçik test səhnəsi, render yox).

## B. Qəhrəman / asset əlavə etmək
1. Qəhrəman: `assets/characters/<ad>/character.md` (şablon `characters/README.md`-də) + `<ad>-v1.svg` (qruplar: head, eyes, mouth, body, arm-l, arm-r, leg-l, leg-r, accessory). STYLE.md palitrasına uyğun.
2. Verilmiş PNG/SVG varsa — orijinalı `source/`-da saxla, kodla animasiya üçün hissələrə ayrılmış SVG versiyası hazırla.
3. Musiqi/SFX/font: yalnız açıq lisenziya; `assets/CREDITS.md`-yə sətir.
4. `assets/README.md` kataloquna və `characters/README.md` siyahısına sətir əlavə et.
5. Dəyişiklik = yeni versiya fayl; köhnəni silmə.
