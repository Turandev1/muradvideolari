# Remote iş bələdçisi

## Murad üçün

İki yolla işləyə bilərsən:

1. **Cloud (tövsiyə olunur, komputer sönülü olsa da işləyir):** claude.ai/code → bu GitHub repo ilə yeni sessiya. Claude əvvəlcə `bash scripts/cloud-setup.sh` ilə alətləri qurur (~15 s). **Cloud-da render-i sən də istəyə bilərsən** — hazır MP4 sənə Claude tətbiqində fayl kimi gəlir.
2. **Remote Control (sahibin komputeri):** fayllar komputerdə qalır. Burada **render-i yalnız sahib edir** (konflikt olmasın deyə).

**Claude sənin üçün ssenari və video kodunu yazır.**

| Nə istəyirsən | Yaz |
|---|---|
| Yeni hekayə başlat | `Yeni hekayə: <mövzu>` və ya `/story-episode <mövzu>` |
| Ssenarini təsdiqlə | `Ssenarini təsdiqləyirəm` |
| Düzəliş | `Düzəliş: 3-cü səhnədə …` |
| Videonun kodunu qur | `Videonu qur` və ya `/story-build EP001` |
| Nəticəni gör | `Snapshot göstər` (kadr şəkilləri) |
| Bütün epizodların vəziyyəti | `Epizodların statusu` |
| Mövzu fikri saxla | `Mövzu siyahısına əlavə et: …` |
| Referans videodan üslub | `Referansları analiz et` və ya `/story-style` |
| Yeni qəhrəman / asset | `Yeni qəhrəman əlavə et: …` |
| Yükləmə mətni | `EP001 üçün yükləmə mətnini ver` |
| Hazır video (MP4) | **Cloud-da:** `Render et EP001` — video sənə fayl kimi gəlir və GitHub-da saxlanır. **Komputerdə:** sahib render edir |
| Nə edəcəyimi bilmirəm | `Kömək` və ya `Nə edim?` — Claude addım-addım yol göstərir |

Bilinməli olanlar:
- Hər yeni söhbətin əvvəlində Claude səni salamlayır, vəziyyəti deyir və növbəti addımı təklif edir — sadəcə nömrəni seç.
- Söhbət çox uzananda (~40–50%) Claude xəbərdarlıq edəcək: onda yeni söhbət aç və Claude-un verdiyi cümləni yaz.
- Preview linki (`localhost`) telefonda açılmır — Claude PNG kadrlar göstərir.
- Ssenarilər ingiliscədir, Claude sənə Azərbaycanca xülasə verir.
- Komputer söndürülsə və ya yuxuya getsə bağlantı kəsilir.

---

## Sahib üçün

- **Lokal render:** Claude-a render istəyini safe word ilə birlikdə **eyni mesajda** yaz (safe word root `CLAUDE.md`-dədir). Safe word yoxdursa Claude render etmir və sənə desktop bildirişi göndərir.
- **Cloud render:** cloud sessiyada Murad da render edə bilər (safe word lazım deyil). Qayda root `CLAUDE.md` → "RENDER QAYDASI → A".
- Cloud üçün dəyişiklikləri GitHub-a push et; Claude-un işi `claude/...` branch-larına düşür — `main`-ə merge et.
- Komputer açıq qalmalıdır: Claude desktop açıq, keep-awake aktiv.
- Remote Control-u Murad üçün ayrı sessiyada aktiv et. Murad telefonda eyni hesabla girir.
- Cloud render üçün layihəni private GitHub repo-ya push et.
