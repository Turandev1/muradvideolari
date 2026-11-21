# Asset kitabxanası

| Qovluq | Nə saxlanır | Format |
|---|---|---|
| `characters/<ad>/` | Sabit qəhrəmanlar: `character.md` + `<ad>-v1.svg` (hissələrə bölünmüş qruplarla) + poz/ifadə variantları | SVG (əsas), PNG |
| `backgrounds/` | Fon səhnələri (meşə, qala, kitabxana…), parallax qatları ayrı fayllarda | SVG, PNG |
| `props/` | Əşyalar: sehrli kitab, açar, kristal… | SVG, GLB (3D) |
| `music/` | Fon musiqisi | MP3/WAV/OGG |
| `sfx/` | Səs effektləri | WAV/OGG |
| `fonts/` | Açıq lisenziyalı fontlar (OFL) | WOFF2/TTF |

## Qaydalar
- Fayl adları `kebab-case`, versiya ilə: `luna-v1.svg`, `luna-v2.svg`. Köhnə versiyanı silmə.
- Hər musiqi/SFX/font üçün `CREDITS.md`-yə yaz: fayl, mənbə URL, müəllif, lisenziya (CC0, CC-BY 4.0, OFL…). CC-BY olanlar video təsvirində kreditlənir.
- Yalnız orijinal və ya açıq lisenziyalı asset — mövcud cizgi filmlərindən heç nə.
- Yeni asset əlavə olunanda aşağıdakı kataloqa bir sətir əlavə et.

## Kataloq
| Asset | Növ | Qeyd |
|---|---|---|
| `characters/pip/` | obraz | Pip v1 |
| `characters/twinkle/` | obraz | Twinkle v1 |
| `../tools/synth_audio.py` | musiqi + SFX generatoru | musiqi qutusu laylası, starfall, sparkle, plop, whoosh, chime, dusk ambience |
| Lilita One, Baloo 2 | font (OFL) | npm `@fontsource/*`, `scripts/cloud-setup.sh` qurur |
