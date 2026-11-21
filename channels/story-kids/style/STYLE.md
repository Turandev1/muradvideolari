# Vizual üslub bələdçisi — v1

> v1 referans videoların kadr-kadr təhlilinə əsaslanır (`/reference/`: "The Clever Crab and the Cunning Stork" 16:9, 193 s və 9:16 Shorts kəsimi, 21 s).
> Referansdan **yalnız üslub prinsipləri** götürülüb — obrazlar, loqo, səhnələr orijinaldır.
> Canlı nümunə: `episodes/EP000-sample/video/` (15 s).

## 1. Referans təhlili (nə gördük)
| Element | Referansda | Bizdə necə edirik |
|---|---|---|
| Rəsm | Parlaq, isti, "nağıl kitabı" rəngli illüstrasiya, yumşaq işıq, dərin fon | SVG: çoxpilləli gradient fonlar, qatlı (parallax) təpələr/ağaclar, yumşaq glow — kodla |
| Obrazlar | Çox iri, parlaq gözlər (böyük ağ + qəhvəyi bəbək + 2 işıq nöqtəsi), qalın yumşaq kontur, sadə forma, dostcanlı təbəssüm | Pip / Twinkle: iri göz, 2 highlight, tünd yaşıl kontur 5–7 px, yanaq qızartısı |
| Kamera | Hər kadr hərəkətdədir: yavaş zoom-in/out, şaquli tilt (sualtından su səthinə, göydən aşağı) | Bir "uzun dünya" SVG-si (göy → üfüq → gölməçə) və kamera tilt-i; hər səhnədə 4–6 % push-in |
| Montaj | 2–4 s-də bir yeni kadr; keçidlər: su səthindən keçid, parlaq işıq/bokeh "flash" | Hər 2.5–3.5 s vizual dəyişiklik; keçid = qızılı işıq flash (`mix-blend-mode: screen`) |
| Obraz hərəkəti | Dalğalanma, qanad çırpma, caynaq yelləmə, baxış istiqaməti dəyişir | Nəfəs (scaleY 1.8 %), göz qırpma, bəbək hərəkəti, sevinc hoppanması, ağız sinxronu |
| Altyazı | **Tək söz**, böyük hərflə, ağ, qalın yuvarlaq font, qara kontur + kölgə, kadrın ~75 %-ində, sözə görə "pop" | Lilita One 104 px, `-webkit-text-stroke 14px`, y≈1225 px (safe-zone daxilində). Obraz danışanda söz **qızılı** |
| Son kadr | Brend kartı + "Want to know what happens next?" | "PART 2?" + qısa sirli cümlə; kanal adı seçiləndə brend kartı əlavə olunacaq |
| Səs | Sakit, isti narrator; yumşaq musiqi; az SFX | Kokoro `af_heart` 0.92; musiqi qutusu laylası; parıltı/whoosh/plop SFX |

## 2. Rəng palitrası (alaqaranlıq sehri)
| Rol | Rəng |
|---|---|
| Göy (yuxarı → üfüq) | `#16144A` → `#2F2A74` → `#6C4A9C` → `#CF6F9F` → `#FF9E7C` → `#FFC58C` |
| Su | `#F3A08F` (üfüq əksi) → `#B56FA6` → `#5D4C98` → `#2E3474` → `#171D4A` |
| Təpələr (uzaq → yaxın) | `#8A5FA8`, `#55408A`, `#3A2F6E`; siluet ağaclar `#2A2458` |
| Sehr / ulduz | `#FFF6C8`, `#FFE586`, `#FFD66B`, kontur `#F4A938` |
| Vurğu | lotus `#FF94BC`, yarpaq `#6CC06A` → `#2F7D4A` |
| Mətn | ağ `#FFFFFF` / qızılı `#FFE27A`, kontur `#1A0F2E` |

## 3. Kompozisiya (9:16, 1080×1920)
- Əsas hadisə ortada; **yuxarı 12 %** və **aşağı ~28 %** (y > 1380) platforma UI zonasıdır — mətn oraya düşməsin (`scripts/hf check` yoxlayır).
- Altyazı obrazın üzünü örtməsin: obraz kadrın 35–60 %-ində, altyazı 64 %-də. Geniş planda altyazını yuxarı (y≈560) qaldır.

## 4. Hərəkət
- Easing: `sine.inOut`, `power2.inOut`; pop: `back.out(3)` 0.13 s.
- Obraz heç vaxt donmur: nəfəs + 3–4 s-də bir göz qırpma.
- Hər şey deterministikdir: təsadüfi yerləşmə = toxumlu PRNG (`Math.random` qadağandır).

## 5. Render yükü (yüngül saxla)
- CSS `filter: blur()` / `drop-shadow` animasiyası yoxdur → glow = radial-gradient dairə.
- Bir böyük SVG "dünya" + `transform` kamerası (yenidən çəkmə az olur).
- Video/şəkil asset yoxdur — hamısı vektor; fontlar və GSAP lokal (`assets/`), şəbəkə sorğusu yox.

## 6. Səs
- Narrator: Kokoro `af_heart`, sürət 0.92, -16…-18 LUFS (loudnorm).
- Kiçik sehrli obraz (Twinkle): `af_sky` + pitch +16 % + yüngül exo.
- Musiqi: `tools/synth_audio.py` (kodla yaradılmış musiqi qutusu laylası, lisenziyasız/orijinal), narratordan ~16–18 dB aşağı.
- SFX: ulduz düşməsi, parıltı, plop, whoosh, chime — eyni skript.


## 7. Əlavə: lokal nümunədən (EP000-sample-falling-star) dərslər

> Əsas qaydalar 1–6-cı bölmələrdir (altyazı = tək söz, Lilita One). Aşağıdakı cədvəl alternativ lokal nümunənin qeydləridir; ziddiyyət olarsa 1–6 keçərlidir.

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
- v1 — 2 referans videonun kadr təhlili: tək-söz altyazı, iri-göz obrazlar, daimi kamera hərəkəti, flash keçidləri, son kart. Alaqaranlıq palitrası, render-yüngül texnika qaydaları.
- v1.1 — lokal və cloud v1 birləşdirildi (2026-11-21): 1–6 əsas, 7 — lokal nümunənin dərsləri (davamlı səth keçidi, squash/stretch, Kokoro fonem yoxlaması).
