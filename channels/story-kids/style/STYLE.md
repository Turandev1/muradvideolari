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

## Dəyişiklik qeydi
- v0 — ilkin üslub, referanslardan əvvəl.
