# Hekayə kanalı (story-kids) — kanal qaydaları

> Kanalın adı hələ seçilməyib. Ad seçiləndə `channel.md`-ni yenilə, qovluq adı `story-kids` qalır.

## Kanal profili

| Parametr | Dəyər |
|---|---|
| Auditoriya | Uşaqlar, **8–12 yaş** |
| Kontent dili | **İngilis dili** (ssenari, səs, ekrandakı mətn). Murad və sahiblə Azərbaycanca danış |
| Format | **9:16 şaquli**, 1080×1920, 30 fps |
| Uzunluq | **60–90 saniyə** |
| Platformalar | YouTube Shorts, TikTok, Instagram Reels |
| Janr | Sirli (mysterious), fantastik, sehrli macəralar |
| Vizual | Fantastik üslub; **əsasən 2D** obraz və elementlər, bəzən 3D (Three.js) |
| Altyazı | **Tək-tək söz** (referans üslubu): ağ, qalın Lilita One, tünd kontur, ekranın ~64%-ində — bax `style/STYLE.md` |
| Səs | Kokoro TTS (lokal), uşaq-dostu narrator + obrazlara fərqli səslər |
| Musiqi / SFX | Var — CC0 / açıq lisenziya, sirli-sehrli atmosfer |

## Vizual üslub — DİQQƏT

Üslub hələ ilkin versiyadadır. **Sonradan referans videolar veriləcək** (`style/references/`).
Referans gələndə `story-style` skill-i ilə onları analiz et və `style/STYLE.md`-ni təkmilləşdir.
Hər epizoddan əvvəl `style/STYLE.md`-ni oxu — mənbə həqiqəti odur.

## Sabit qəhrəmanlar və asset-lər

- Kanalın **sabit qəhrəmanları** var — `assets/characters/` (hər obraz üçün qovluq + `character.md`).
- Yeni asset-lər (obraz, fon, əşya, musiqi, SFX, font) sonradan əlavə oluna bilər — `assets/README.md`-dəki qaydaya uyğun saxla.
- Obrazları hər epizodda **eyni** görünüşdə istifadə et (rəng palitrası, proporsiya, geyim). Dəyişiklik = yeni versiya (`v2`), köhnəni saxla.

## Uşaq təhlükəsizliyi (məcburi)

- Qorxulu yox, **sirli və heyrətamiz**: qan, zorakılıq, ölüm, real təhlükə, jumpscare yoxdur.
- Pis obrazlar komik/yumşaq olsun; hər hekayə müsbət və ya maraqlı sualla bitir.
- Uşaqları təhlükəli hərəkətə (evdən qaçmaq, yad adamla getmək, od, dərman) təşviq etmə.
- Real brend, məşhur personaj, mövcud cizgi filmlərinin obrazları/musiqisi **qadağandır** — hamısı orijinal.
- YouTube-da **"Made for Kids"** işarələnməlidir (COPPA). TikTok/Instagram 13+ olduğundan təsvir valideyn/ailə auditoriyasına da hitab etsin.

## Hekayə strukturu (60–90 san)

1. **Hook (0–3 san)** — sirli sual, qəribə səhnə və ya "What if…". İlk kadrda hərəkət olmalıdır.
2. **Quruluş (3–15 san)** — qəhrəman + sirr.
3. **Macəra (15–60 san)** — 2–3 dönüş nöqtəsi, hər 5–8 saniyədə vizual dəyişiklik.
4. **Kulminasiya (60–80 san)** — sirr açılır və ya yeni sirr yaranır.
5. **Son (son 5 san)** — **cliffhanger və ya tamaşaçıya sual** ("What would YOU do?", "Part 2?").

Dil: qısa cümlələr (≤ 12 söz), canlı fellər, 8–12 yaşa uyğun söz ehtiyatı. ~150 söz/dəqiqə → 60 san ≈ 140–160 söz, 90 san ≈ 210–230 söz.

## İş axını

```
idea → script-draft → script-approved → building → ready-to-render → rendered → published
```

1. **Murad mövzu verir** → `story-episode` skill-i: epizod qovluğu + ssenari + səhnə bölgüsü. Muradə göstər.
2. **Murad təsdiqləyir** (və ya düzəliş istəyir) → status `script-approved`. Təsdiqsiz video koduna keçmə.
3. **Video kodu** → `story-build` skill-i: TTS, musiqi/SFX, HyperFrames kompozisiyası, preview + kadr snapshot-ları. Status `ready-to-render`.
4. **Render** → `story-render` skill-i. **Cloud sessiyada** Murad və ya sahib istəyəndə render edilir. **Lokal komputerdə** yalnız mesajda sahibin safe word-u olanda (root `CLAUDE.md` → "RENDER QAYDASI"); yoxdursa — render etmə, Muradə "lokal render-i sahib edir" de.
5. **Yükləmə məlumatı** → `upload.md` (title, description, hashtag-lar). Murad əl ilə yükləyir → status `published`.

## Qovluqlar

```
channel.md              kanal adı, bio, platform linkləri
style/STYLE.md          vizual üslub bələdçisi (referanslara görə yenilənir)
style/references/       referans videolar (sahib/Murad əlavə edir)
assets/                 sabit qəhrəmanlar, fonlar, əşyalar, musiqi, sfx, fontlar
ideas/topics.md         mövzu siyahısı (Murad əlavə edir)
episodes/_template/     yeni epizod şablonu
episodes/EP###-slug/    hər epizod: script.md, scenes.md, upload.md, video/ (HyperFrames layihəsi)
renders/                hazır videolar (git-ə düşmür)
```
