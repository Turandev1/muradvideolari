# Sabit qəhrəmanlar

Hər qəhrəman üçün qovluq: `characters/<ad>/`
- `character.md` — kartoçka (aşağıdakı şablon)
- `<ad>-v1.svg` — əsas görünüş. SVG qrupları: `head`, `eyes`, `mouth`, `body`, `arm-l`, `arm-r`, `leg-l`, `leg-r`, `accessory`
- `poses/`, `expressions/` — əlavə vəziyyətlər

## character.md şablonu
```
# <Ad>
- Rol: (əsas qəhrəman / köməkçi / sirli obraz)
- Yaş / növ:
- Xarakter (3 söz):
- Görünüş: boy, forma, rənglər (hex), geyim, fərqləndirici detal
- Səs: Kokoro voice id, sürət, ton
- Danışıq tərzi / tipik ifadə:
- Edə bilmədiyi / qaydası:
- İlk göründüyü epizod:
```

## Siyahı
| Ad | Rol | Status |
|---|---|---|
| Pip | əsas qəhrəman (qurbağa) | v1 |
| Twinkle | sehrli dost (düşmüş ulduz) | v1 |

Bütün obrazların kodu: `characters.js` (`SK.defs()`, `SK.pip()`, `SK.twinkle()`). Epizodun `video/assets/`-inə kopyala. SVG faylları: `node export-svg.cjs`.
| Nori | qurbağa (lokal EP000-sample-falling-star) | v1 — kod `pond.html`-dədir, hələ `characters.js`-ə köçürülməyib |
| Lumi | ulduz (lokal EP000-sample-falling-star) | v1 — kod `pond.html`-dədir |
| Ali | kiçik oğlan (EP001) | v2 realist — `ali-fox-v2.js` (`SK3.ali()`); v1 cizgi: `ali-fox.js` |
| Fox (tülkü) | hiyləgər tülkü (EP001) | v2 realist — `ali-fox-v2.js` (`SK3.fox()`: stand / lie / run pozaları) |
