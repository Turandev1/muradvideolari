# Vizual üslub bələdçisi — v0 (ilkin)

> ⚠️ Bu ilkin versiyadır. Referans videolar `style/references/`-ə əlavə olunanda
> `story-style` skill-i ilə analiz edilib yenilənəcək. Hər yeniləmədə versiyanı artır və dəyişiklik qeydini aşağıya yaz.

## Ümumi hiss
Fantastik, sirli, sehrli, isti və təhlükəsiz. "Gecə yarısı açılan sehrli kitab" hissi — qorxulu yox, heyrətamiz.

## Texnika
- **2D (əsas):** SVG obrazlar, qatlı (parallax) fonlar, GSAP ilə animasiya. Obrazların hissələri (baş, göz, qol) ayrı qrup — göz qırpma, nəfəs, yeriş üçün.
- **3D (bəzən):** Three.js — sehrli obyekt (kristal, portal, kitab), kamera uçuşu. Səhnəni 2D-yə qarışdır, tam 3D film yox.
- **Effektlər:** parıltı (glow), uçan zərrəciklər, duman qatları, işıq şüaları, yumşaq vignette.

## Rəng palitrası (ilkin)
| Rol | Rəng |
|---|---|
| Gecə fonu | `#1B1035` dərin bənövşəyi → `#0E2A47` gecə mavisi |
| Sehr/parıltı | `#FFD66B` qızılı, `#7CF3E0` firuzəyi |
| Vurğu | `#FF7AB6` çəhrayı-maqenta |
| Obraz dərisi/isti tonlar | `#F6C9A0`, `#E89A6B` |

## Kompozisiya (9:16)
- Əsas hadisə ekranın orta 60%-ində; yuxarı 12% və aşağı 20% platforma UI-ı üçün boş saxla (Shorts/TikTok düymələri).
- Hər 5–8 saniyədə vizual dəyişiklik (yeni səhnə, kamera hərəkəti, yeni obyekt).
- Ekran mətni: iri, qalın, yuvarlaq font, 1 sətirdə ≤ 4 söz, yalnız açar anlarda.

## Hərəkət
- Yumşaq easing (`power2.inOut`, `sine`), "sehrli" yavaş süzülmə. Sürətli kəsimlər yalnız hook və kulminasiyada.
- Obrazlar heç vaxt tam donmur: nəfəs/göz qırpma idle animasiyası.

## Səs
- Narrator: isti, sakit, sirli. Kokoro nümunələri `style/voice-samples/`-dadır (`af_heart`, `bf_emma`, `am_michael`, `bm_george`, sürət 0.95) — Murad seçəcək, seçilən səs adını bura yaz.
- Musiqi: yumşaq orkestr/musiqi qutusu/ambient, narratordan -18…-22 dB aşağı.
- SFX: parıltı, səhifə çevrilməsi, külək, sehr "whoosh".


## v1 — referans analizi (reference/, 2026-11-21)

İki referans kadr-kadr baxıldı: **Shorts tizer** (478×850, 21 s: 13 s hekayə + 8 s kanal kartı) və **uzun hekayə** (854×480, 3:13).

| Nə görürük | Bizdə necə |
|---|---|
| Parlaq, isti, doymuş rəngli "storybook" cizgi; qalın tünd kontur, yumşaq cel-kölgə, iri parlaq gözlər | SVG, kontur `#2b1a10` 6–7 px, hər obrazda 2 parıltı nöqtəli iri gözlər |
| Shorts-da **sərt kəsim yoxdur** — bir davamlı kamera: su altı → səthdən keçid → səma → sahil | Hər epizodda ən azı bir "davamlı keçid" (tilt/pan, səthdən keçmə). Kəsim əvəzinə kamera hərəkəti |
| Uzun videoda statik illüstrasiya + yavaş Ken Burns, crossfade, komik səs-yazısı ("EEK!") | Statik kadr yox: obrazlar həmişə hərəkətdə (nəfəs, göz qırpma, squash/stretch), parallax qatlar |
| Altyazı: **tək söz**, ağ, qalın, tünd kontur, ekranın ~75%-də | **1–3 sözlük qrup**, Nunito 900, 96 px, ağ + 13 px `#1d1238` kontur, açar söz qızılı `#FFD66B`, dialoq açıq-qızılı kursiv, pop-in. y ≈ 1100 px (platform UI-dan yuxarı) |
| Sonda kanal kartı + "Want to know what happens next?" | Son 1.5–2 s: tamaşaçıya sual kartı (yuxarıda, iri). Kanal adı seçiləndə brend kartı əlavə olunacaq |
| Səs: tək narrator, musiqi altda | Narrator `bf_emma` 0.95 + obrazlara ayrı səs; SFX hər görünən hərəkətə (sıçrama, splash, qabarcıq, sehr) |

### Render yükünü aşağı saxlamaq
- Yalnız `transform`/`opacity` animasiyası; CSS/SVG `filter`, `blur`, `backdrop-filter` yox.
- Parıltı = radial gradient (filter yox). Hissəciklər ≤ 40, deterministik (seeded).
- Bir böyük "dünya" SVG-si + kamera = `translateY` / `scale`. Three.js yalnız lazım olanda.

### Nümunə
`episodes/EP000-sample-falling-star/` — 15 s, bu üslubun etalonu (Nori + Lumi).

## Dəyişiklik qeydi
- v0 — ilkin üslub, referanslardan əvvəl.
- v1 — iki referans video analiz edildi; davamlı kamera, söz-qrup altyazı, render-yüngül texnika (2026-11-21).
