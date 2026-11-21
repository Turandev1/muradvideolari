# Remote iş bələdçisi

## Murad üçün

Sən telefondan Claude tətbiqi ilə (Remote Control) bu komputerə qoşulursan. Fayllar komputerdə qalır.

**Claude sənin üçün ssenari və video kodunu yazır. Render-i (hazır MP4 faylını) sahib edir.**

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
| Hazır video (MP4) | Bu komputerdə: sahib render edir. **Claude cloud sessiyasında** (claude.ai/code, repo seçərək): `Render et EP001` yaz — özün render edə bilərsən |

Bilinməli olanlar:
- Preview linki (`localhost`) telefonda açılmır — Claude PNG kadrlar göstərir.
- Ssenarilər ingiliscədir, Claude sənə Azərbaycanca xülasə verir.
- Komputer söndürülsə və ya yuxuya getsə bağlantı kəsilir.

---

## Sahib üçün

- **Render:** Claude-a render istəyini safe word ilə birlikdə **eyni mesajda** yaz (safe word root `CLAUDE.md`-dədir). Safe word yoxdursa Claude render etmir və sənə desktop bildirişi göndərir.
- Komputer açıq qalmalıdır: Claude desktop açıq, keep-awake aktiv.
- Remote Control-u Murad üçün ayrı sessiyada aktiv et. Murad telefonda eyni hesabla girir.
- Cloud render üçün layihəni private GitHub repo-ya push et. Cloud-da Murad da render edə bilər (safe word lazım deyil); alətlər `scripts/setup-cloud.sh` ilə avtomatik qurulur. Lokal render yalnız sənindir — konflikt olmasın deyə.
