/* story-kids — Ali (little boy) + Fox, "storybook-realistic" v2. SVG markup generators.
 * (v1 cartoon version: ali-fox.js — kept.)
 * Usage: el.innerHTML = SK3.defs() + SK3.ali();  el2.innerHTML = SK3.fox();  SK3.bread(scale)
 * Origin (0,0) = centre of the feet on the ground, drawn upward. Ali faces camera (~565 tall).
 * Fox faces LEFT. Fox has three pose groups: .fox-stand, .fox-lie, .fox-run (lie/run start hidden).
 * Parts: .ali-legL/R .ali-body .ali-head .ali-lid .ali-pupil .ali-brow-l/r .ali-m-smile/sad/flat/open .ali-tear-l/r
 *        .fox-leg .fox-head .fox-tail .fox-lid .fox-m-closed/.fox-m-open .fox-tear .fox-bread .fox-paw
 */
(function () {
  function defs() {
    return `
    <linearGradient id="a_face" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fbdcc0"/><stop offset=".6" stop-color="#efb88e"/><stop offset="1" stop-color="#d89468"/></linearGradient>
    <linearGradient id="a_skin" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#f3c7a2"/><stop offset="1" stop-color="#d9976d"/></linearGradient>
    <linearGradient id="a_jacket" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#e5654a"/><stop offset=".5" stop-color="#cc4a31"/><stop offset="1" stop-color="#8c291a"/></linearGradient>
    <linearGradient id="a_pants" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#5a6fa3"/><stop offset=".55" stop-color="#43568a"/><stop offset="1" stop-color="#2b3860"/></linearGradient>
    <linearGradient id="a_hair" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#8a5a33"/><stop offset="1" stop-color="#442511"/></linearGradient>
    <radialGradient id="a_iris" cx=".5" cy=".4" r=".7"><stop offset="0" stop-color="#c08a4a"/><stop offset=".6" stop-color="#7a4a22"/><stop offset="1" stop-color="#3f2410"/></radialGradient>
    <linearGradient id="a_shoe" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9a6a3e"/><stop offset="1" stop-color="#4b2d17"/></linearGradient>
    <linearGradient id="b_crust" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e9ad55"/><stop offset=".6" stop-color="#c98532"/><stop offset="1" stop-color="#8f5a1c"/></linearGradient>
    <linearGradient id="f_fur" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f4a24c"/><stop offset=".5" stop-color="#dd6e2b"/><stop offset="1" stop-color="#b9501b"/></linearGradient>
    <linearGradient id="f_furDark" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d9702f"/><stop offset="1" stop-color="#9e4416"/></linearGradient>
    <linearGradient id="f_cream" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fffaf0"/><stop offset="1" stop-color="#f1dcc0"/></linearGradient>
    <radialGradient id="f_eye" cx=".5" cy=".4" r=".7"><stop offset="0" stop-color="#f6c24a"/><stop offset="1" stop-color="#b8741c"/></radialGradient>`;
  }

  function bread(s) {
    return `<g transform="scale(${s || 1})">
      <ellipse cx="0" cy="6" rx="64" ry="28" fill="url(#b_crust)" stroke="#7a4a16" stroke-width="2.5"/>
      <path d="M-40 -8 Q-30 8 -40 20 M-12 -14 Q-2 4 -12 18 M16 -12 Q26 6 16 20 M40 -4 Q48 8 40 16" stroke="#f2c47e" stroke-width="4" fill="none" stroke-linecap="round" opacity=".85"/>
      <ellipse cx="-14" cy="-10" rx="30" ry="9" fill="#ffd98a" opacity=".55"/>
      <path d="M-18 -16 Q4 -24 26 -14 Q4 -8 -18 -16Z" fill="#ffe27a" stroke="#e0b030" stroke-width="1.5"/>
      <ellipse cx="-4" cy="-17" rx="9" ry="2.5" fill="#fff6c0" opacity=".9"/>
      <circle cx="30" cy="2" r="1.6" fill="#fff" opacity=".6"/><circle cx="-30" cy="10" r="1.4" fill="#fff" opacity=".6"/><circle cx="8" cy="12" r="1.5" fill="#fff" opacity=".5"/>
    </g>`;
  }

  /* ───────── ALI ───────── */
  function ali() {
    const OUT = "#a8704c";
    const leg = (side, x) => `<g class="ali-leg${side}" style="transform-origin:${x}px -268px">
        <path d="M${x - 27} -272 L${x + 27} -272 L${x + 20} -42 L${x - 20} -42Z" fill="url(#a_pants)" stroke="#27335a" stroke-width="2.5" stroke-linejoin="round"/>
        <path d="M${x - 8} -230 Q${x - 4} -180 ${x - 10} -120 M${x + 12} -250 Q${x + 14} -190 ${x + 8} -100" stroke="#27335a" stroke-width="2" fill="none" opacity=".35"/>
        <path d="M${x - 20} -52 Q${x} -44 ${x + 20} -52 L${x + 21} -42 L${x - 21} -42Z" fill="#2a355c" opacity=".6"/>
        <path d="M${x - 24} -44 Q${x - 32} -6 ${x - 24} 0 L${x + 28} 0 Q${x + 36} -14 ${x + 22} -44Z" fill="url(#a_shoe)" stroke="#3a2210" stroke-width="2.5" stroke-linejoin="round"/>
        <path d="M${x - 28} -2 L${x + 32} -2" stroke="#e9e1d2" stroke-width="5" stroke-linecap="round"/>
        <ellipse cx="${x + 2}" cy="-26" rx="14" ry="5" fill="#fff" opacity=".12"/>
      </g>`;
    const arm = (side, s) => `<g class="ali-arm${side}">
        <path d="M${s * 60} -410 Q${s * 100} -350 ${s * 42} -306" stroke="#7d2415" stroke-width="40" stroke-linecap="round" fill="none"/>
        <path d="M${s * 60} -410 Q${s * 100} -350 ${s * 42} -306" stroke="url(#a_jacket)" stroke-width="35" stroke-linecap="round" fill="none"/>
        <path d="M${s * 36} -316 L${s * 54} -298" stroke="#f1e4cc" stroke-width="8" stroke-linecap="round"/>
        <path d="M${s * 28} -300 Q${s * 36} -280 ${s * 52} -292 Q${s * 58} -306 ${s * 46} -312Z" fill="url(#a_skin)" stroke="${OUT}" stroke-width="2"/>
      </g>`;
    const eye = (x) => `<g>
        <ellipse cx="${x}" cy="-500" rx="14" ry="10" fill="#f6f2ec" stroke="#a07a5a" stroke-width="1.5"/>
        <g class="ali-pupil"><circle cx="${x + 1}" cy="-500" r="8.6" fill="url(#a_iris)"/><circle cx="${x + 1}" cy="-500" r="4.2" fill="#150a05"/><circle cx="${x - 2}" cy="-503" r="2.3" fill="#fff"/><circle cx="${x + 4}" cy="-497" r="1.1" fill="#fff" opacity=".8"/></g>
        <rect class="ali-lid" x="${x - 15}" y="-512" width="30" height="21" fill="#efb88e" style="transform-box:fill-box;transform-origin:50% 0;transform:scaleY(0)"/>
        <path d="M${x - 14} -501 Q${x} -513 ${x + 14} -501" stroke="#3a2314" stroke-width="2.6" fill="none" stroke-linecap="round"/>
        <path d="M${x + (x < 0 ? -14 : 14)} -501 l${x < 0 ? -4 : 4} -3" stroke="#3a2314" stroke-width="1.6" stroke-linecap="round"/>
        <path d="M${x - 11} -492 Q${x} -489 ${x + 11} -492" stroke="#c98a62" stroke-width="1.2" fill="none" opacity=".6"/>
      </g>`;
    return `<g class="ali">
      <ellipse cx="-30" cy="4" rx="120" ry="13" fill="rgba(30,40,20,.38)"/>
      <g class="ali-body" style="transform-origin:0px 0px">
        ${leg("L", -28)}${leg("R", 28)}
        <path d="M-64 -420 Q-74 -340 -60 -262 L60 -262 Q74 -340 64 -420 Q0 -436 -64 -420Z" fill="url(#a_jacket)" stroke="#7d2415" stroke-width="2.5" stroke-linejoin="round"/>
        <path d="M-60 -272 Q0 -258 60 -272 L60 -258 Q0 -244 -60 -258Z" fill="#a73622" opacity=".75"/>
        <path d="M0 -432 L0 -262" stroke="#f0d9a8" stroke-width="3" opacity=".55"/>
        <path d="M-58 -340 Q-70 -300 -52 -270" stroke="#fff" stroke-width="10" opacity=".08" fill="none"/>
        <path d="M38 -400 Q62 -340 52 -270 L62 -270 Q74 -340 58 -410Z" fill="#000" opacity=".14"/>
        <path d="M-40 -330 Q-48 -300 -44 -280 M30 -316 Q36 -290 32 -274" stroke="#7d2415" stroke-width="2" opacity=".35" fill="none"/>
        <path d="M-28 -424 Q0 -396 28 -424 L20 -438 Q0 -426 -20 -438Z" fill="#f3eadc" stroke="#cbb89a" stroke-width="2"/>
        <rect x="-16" y="-452" width="32" height="34" fill="#dba078" stroke="${OUT}" stroke-width="1.5"/>
        <path d="M-16 -430 Q0 -418 16 -430 L16 -418 Q0 -408 -16 -418Z" fill="#b47850" opacity=".5"/>
        <g class="ali-bread-slot"></g>
        ${arm("L", -1)}${arm("R", 1)}
        <g class="ali-head" style="transform-origin:0px -445px">
          <ellipse cx="-51" cy="-496" rx="9" ry="14" fill="url(#a_skin)" stroke="${OUT}" stroke-width="2"/>
          <ellipse cx="51" cy="-496" rx="9" ry="14" fill="url(#a_skin)" stroke="${OUT}" stroke-width="2"/>
          <path d="M0 -566 C40 -566 55 -532 53 -498 C51 -466 30 -440 0 -438 C-30 -440 -51 -466 -53 -498 C-55 -532 -40 -566 0 -566Z" fill="url(#a_face)" stroke="${OUT}" stroke-width="2.2"/>
          <path d="M-56 -512 C-64 -574 -22 -594 14 -590 C54 -586 68 -550 56 -508 C48 -532 30 -542 8 -541 C-18 -540 -40 -530 -56 -512Z" fill="url(#a_hair)" stroke="#3a1f0e" stroke-width="2.2" stroke-linejoin="round"/>
          <path d="M-40 -560 Q-20 -574 4 -572 M-52 -540 Q-34 -562 -10 -562 M10 -576 Q34 -574 48 -556 M30 -540 Q44 -546 52 -530 M-30 -534 Q-10 -546 14 -540" stroke="#c28a54" stroke-width="2.4" fill="none" opacity=".55" stroke-linecap="round"/>
          
          ${eye(-21)}${eye(21)}
          <path class="ali-brow ali-brow-l" d="M-34 -521 Q-21 -529 -8 -521" stroke="#4d2d16" stroke-width="3.8" fill="none" stroke-linecap="round"/>
          <path class="ali-brow ali-brow-r" d="M8 -521 Q21 -529 34 -521" stroke="#4d2d16" stroke-width="3.8" fill="none" stroke-linecap="round"/>
          <path d="M0 -498 Q-6 -482 -9 -478 Q0 -473 9 -478 Q6 -482 0 -498" stroke="#c98a62" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
          <ellipse cx="-4" cy="-480" rx="2" ry="1.4" fill="#a35f3b" opacity=".7"/><ellipse cx="4" cy="-480" rx="2" ry="1.4" fill="#a35f3b" opacity=".7"/>
          <ellipse cx="-33" cy="-474" rx="13" ry="8" fill="#ff8f8f" opacity=".28"/><ellipse cx="33" cy="-474" rx="13" ry="8" fill="#ff8f8f" opacity=".28"/>
          <path class="ali-m-smile" d="M-15 -457 Q0 -448 15 -457" stroke="#a0483c" stroke-width="3.4" fill="none" stroke-linecap="round"/>
          <path class="ali-m-sad" d="M-13 -452 Q0 -463 13 -452" stroke="#a0483c" stroke-width="3.4" fill="none" stroke-linecap="round" opacity="0"/>
          <path class="ali-m-flat" d="M-12 -455 L12 -455" stroke="#a0483c" stroke-width="3.4" fill="none" stroke-linecap="round" opacity="0"/>
          <g class="ali-m-open" opacity="0"><ellipse cx="0" cy="-454" rx="10" ry="9" fill="#6b1f1f" stroke="#a0483c" stroke-width="2.4"/><ellipse cx="0" cy="-449" rx="6" ry="3.4" fill="#d77a7a"/></g>
          <path d="M-8 -440 Q0 -436 8 -440" stroke="#c98a62" stroke-width="1.5" fill="none" opacity=".5"/>
          <path class="ali-tear ali-tear-l" d="M-24 -490 Q-30 -474 -24 -468 Q-18 -474 -24 -490Z" fill="#cfeeff" stroke="#6fb4dc" stroke-width="1.6" opacity="0"/>
          <path class="ali-tear ali-tear-r" d="M24 -490 Q18 -474 24 -468 Q30 -474 24 -490Z" fill="#cfeeff" stroke="#6fb4dc" stroke-width="1.6" opacity="0"/>
        </g>
      </g>
    </g>`;
  }

  /* ───────── FOX ───────── */
  function foxHead() {
    // head drawn around pivot (-100,-225), facing left
    return `<g class="fox-head" style="transform-origin:-60px -215px">
      <path d="M-98 -290 L-94 -356 L-56 -294Z" fill="url(#f_furDark)" stroke="#6b2d0e" stroke-width="2" stroke-linejoin="round"/>
      <path d="M-92 -300 L-91 -338 L-70 -300Z" fill="#2a1810" opacity=".8"/>
      <path d="M-64 -294 L-46 -366 L-12 -288Z" fill="url(#f_fur)" stroke="#6b2d0e" stroke-width="2" stroke-linejoin="round"/>
      <path d="M-56 -300 L-46 -348 L-26 -298Z" fill="#f6e3c6"/>
      <path d="M-50 -346 L-46 -366 L-38 -340Z" fill="#2a1810"/>
      <path d="M-40 -286 C-80 -302 -125 -272 -160 -250 C-185 -240 -206 -240 -209 -229 C-209 -214 -190 -206 -160 -204 C-135 -200 -110 -188 -75 -188 C-35 -190 -20 -225 -26 -256 C-28 -270 -34 -280 -40 -286Z" fill="url(#f_fur)" stroke="#6b2d0e" stroke-width="2.2" stroke-linejoin="round"/>
      <path d="M-209 -229 C-209 -214 -190 -206 -160 -204 C-135 -200 -110 -188 -75 -188 C-100 -210 -140 -224 -176 -238 C-196 -243 -206 -240 -209 -229Z" fill="url(#f_cream)"/>
      <path d="M-75 -188 L-42 -168 L-38 -200Z M-98 -196 L-70 -172 L-66 -196Z" fill="url(#f_cream)" stroke="#d9bf9b" stroke-width="1"/>
      <path d="M-155 -258 Q-110 -276 -62 -272 M-120 -265 Q-84 -282 -48 -268" stroke="#b9501b" stroke-width="2" fill="none" opacity=".5" stroke-linecap="round"/>
      <ellipse cx="-207" cy="-232" rx="9" ry="7" fill="#1c100a"/><ellipse cx="-209" cy="-235" rx="3" ry="2" fill="#fff" opacity=".5"/>
      <path d="M-150 -248 L-206 -236" stroke="#1c100a" stroke-width="2.2" opacity=".55" stroke-linecap="round"/>
      <g>
        <path d="M-146 -247 Q-129 -261 -111 -247 Q-129 -237 -146 -247Z" fill="url(#f_eye)" stroke="#1c100a" stroke-width="2.4" stroke-linejoin="round"/>
        <ellipse class="fox-pupil" cx="-128" cy="-247" rx="3.8" ry="7" fill="#150a05"/>
        <circle cx="-131" cy="-251" r="2.2" fill="#fff"/>
        <path class="fox-lid" d="M-146 -247 Q-129 -261 -111 -247 Q-129 -251 -146 -247Z" fill="#dd6e2b" style="transform-box:fill-box;transform-origin:50% 0;transform:scaleY(0)"/>
        <path d="M-150 -258 Q-128 -272 -106 -258" stroke="#6b2d0e" stroke-width="3" fill="none" stroke-linecap="round"/>
      </g>
      <path class="fox-m-closed" d="M-205 -222 Q-170 -211 -128 -208" stroke="#1c100a" stroke-width="2.6" fill="none" stroke-linecap="round"/>
      <g class="fox-m-open" opacity="0"><path d="M-205 -224 C-190 -196 -150 -176 -112 -192 C-140 -206 -170 -216 -205 -224Z" fill="#6b1f1f" stroke="#1c100a" stroke-width="2.2" stroke-linejoin="round"/><ellipse cx="-160" cy="-194" rx="18" ry="7" fill="#e97a8a"/></g>
      <path class="fox-tear" d="M-142 -236 Q-150 -214 -142 -204 Q-134 -214 -142 -236Z" fill="#cfeeff" stroke="#6fb4dc" stroke-width="1.5" opacity="0"/>
      <g class="fox-bread" opacity="0" transform="translate(-196 -206) rotate(-6)">${bread(0.42)}</g>
    </g>`;
  }

  function fox() {
    const furLines = (arr) => arr.map((a) => `<path d="${a}" stroke="#a8461a" stroke-width="2.2" fill="none" opacity=".4" stroke-linecap="round"/>`).join("");
    const legF = (x, dark) => `<g class="fox-leg" style="transform-origin:${x}px -190px">
        <path d="M${x - 16} -192 C${x - 4} -196 ${x + 14} -190 ${x + 12} -165 L${x + 4} -70 L${x + 8} -10 L${x - 18} -10 L${x - 14} -70 Z" fill="url(#${dark ? "f_furDark" : "f_fur"})" stroke="#6b2d0e" stroke-width="2" stroke-linejoin="round"/>
        <path d="M${x - 15} -72 L${x + 4} -72 L${x + 8} -10 L${x - 19} -10Z" fill="#241510"/>
        <path d="M${x - 19} -10 Q${x - 6} -2 ${x + 10} -10" stroke="#241510" stroke-width="5" fill="none" stroke-linecap="round"/>
      </g>`;
    const legB = (x, dark) => `<g class="fox-leg" style="transform-origin:${x}px -200px">
        <path d="M${x - 40} -205 C${x - 10} -220 ${x + 28} -200 ${x + 20} -150 L${x + 8} -86 L${x + 10} -10 L${x - 14} -10 L${x - 12} -80 C${x - 34} -112 ${x - 52} -170 ${x - 40} -205Z" fill="url(#${dark ? "f_furDark" : "f_fur"})" stroke="#6b2d0e" stroke-width="2" stroke-linejoin="round"/>
        <path d="M${x - 12} -74 L${x + 8} -74 L${x + 10} -10 L${x - 15} -10Z" fill="#241510"/>
        <path d="M${x - 15} -10 Q${x - 2} -2 ${x + 12} -10" stroke="#241510" stroke-width="5" fill="none" stroke-linecap="round"/>
      </g>`;
    return `
    <g class="fox">
      <!-- STAND -->
      <g class="fox-stand">
        <ellipse cx="20" cy="4" rx="190" ry="13" fill="rgba(30,40,20,.38)"/>
        <g class="fox-body" style="transform-origin:0px 0px">
          <g class="fox-tail" style="transform-origin:140px -190px">
            <path d="M128 -205 C190 -262 300 -262 348 -176 C334 -112 252 -98 190 -128 C160 -140 140 -150 126 -165Z" fill="url(#f_fur)" stroke="#6b2d0e" stroke-width="2.2" stroke-linejoin="round"/>
            <path d="M298 -252 C340 -234 354 -196 348 -176 C336 -122 300 -108 268 -112 C292 -152 300 -204 298 -252Z" fill="url(#f_cream)" stroke="#d9bf9b" stroke-width="1.5"/>
            ${furLines(["M160 -190 C200 -220 250 -224 290 -204", "M165 -165 C210 -178 250 -176 290 -160", "M150 -176 C190 -196 230 -196 262 -184"])}
          </g>
          ${legB(118, true)}${legF(-62, true)}
          <path d="M-100 -180 C-95 -228 -40 -243 30 -241 C100 -241 152 -228 162 -186 C166 -150 130 -118 70 -112 C20 -108 -40 -112 -80 -125 C-98 -135 -102 -160 -100 -180Z" fill="url(#f_fur)" stroke="#6b2d0e" stroke-width="2.2" stroke-linejoin="round"/>
          <path d="M-84 -134 C-40 -117 20 -111 70 -113 C100 -115 122 -124 136 -140 C112 -130 70 -122 20 -123 C-30 -123 -60 -128 -84 -134Z" fill="url(#f_cream)" opacity=".95"/>
          <path d="M-100 -188 C-112 -156 -102 -132 -80 -124 C-86 -150 -86 -172 -100 -188Z" fill="url(#f_cream)"/>
          <path d="M-20 -225 Q60 -240 140 -216" stroke="#fbbf70" stroke-width="5" fill="none" opacity=".45" stroke-linecap="round"/>
          ${furLines(["M-70 -200 Q-30 -216 10 -214", "M30 -210 Q80 -222 120 -205", "M-40 -170 Q10 -184 60 -170", "M90 -180 Q125 -176 150 -190", "M0 -150 Q40 -162 80 -150"])}
          ${legB(92, false)}${legF(-36, false)}
          ${foxHead()}
        </g>
      </g>

      <!-- LIE (sobbing on the ground) -->
      <g class="fox-lie" style="opacity:0">
        <ellipse cx="0" cy="4" rx="230" ry="12" fill="rgba(30,40,20,.38)"/>
        <g class="fox-tail2">
          <path d="M130 -56 C210 -96 310 -60 292 -18 C262 8 190 4 130 -8Z" fill="url(#f_fur)" stroke="#6b2d0e" stroke-width="2.2" stroke-linejoin="round"/>
          <path d="M268 -62 C300 -52 298 -24 290 -16 C270 2 252 4 238 1 C256 -14 262 -40 268 -62Z" fill="url(#f_cream)"/>
        </g>
        <path d="M-70 -18 C-82 -82 -20 -120 70 -116 C142 -108 164 -52 142 -8 C70 4 -10 4 -70 -18Z" fill="url(#f_fur)" stroke="#6b2d0e" stroke-width="2.2" stroke-linejoin="round"/>
        <path d="M-60 -12 C-20 -4 60 0 130 -6 C100 -18 20 -22 -50 -26Z" fill="url(#f_cream)" opacity=".9"/>
        <ellipse cx="86" cy="-56" rx="58" ry="46" fill="url(#f_furDark)" stroke="#6b2d0e" stroke-width="2"/>
        <path d="M120 -26 L196 -10 L196 4 L112 4Z" fill="url(#f_fur)" stroke="#6b2d0e" stroke-width="2" stroke-linejoin="round"/>
        <path d="M168 -14 L200 -10 L200 4 L166 4Z" fill="#241510"/>
        <path d="M-60 -40 C-110 -34 -160 -26 -196 -20 L-200 -4 L-160 2 L-58 -6Z" fill="url(#f_fur)" stroke="#6b2d0e" stroke-width="2" stroke-linejoin="round"/>
        <path d="M-166 -24 L-206 -18 L-208 -2 L-164 0Z" fill="#241510"/>
        ${furLines(["M-30 -90 Q20 -106 70 -100", "M90 -96 Q120 -84 132 -60", "M-20 -60 Q30 -74 80 -64"])}
        <g transform="translate(-6 168) rotate(12 -100 -225)">
          ${foxHead()}
          <g class="fox-paw"><path d="M-170 -250 C-176 -274 -140 -280 -132 -262 C-128 -244 -144 -232 -158 -234Z" fill="#241510" stroke="#0e0805" stroke-width="2"/><circle cx="-150" cy="-258" r="5" fill="#4a3226"/><circle cx="-140" cy="-264" r="4" fill="#4a3226"/><circle cx="-160" cy="-266" r="4" fill="#4a3226"/></g>
        </g>
      </g>

      <!-- RUN (flip with scaleX to run right) -->
      <g class="fox-run" style="opacity:0">
        <ellipse cx="20" cy="4" rx="200" ry="11" fill="rgba(30,40,20,.3)"/>
        <g class="fox-tail3">
          <path d="M150 -206 C230 -216 330 -222 410 -196 C340 -172 260 -160 190 -166Z" fill="url(#f_fur)" stroke="#6b2d0e" stroke-width="2.2" stroke-linejoin="round"/>
          <path d="M350 -212 C380 -214 400 -206 410 -196 C386 -184 362 -178 342 -176 C352 -188 352 -200 350 -212Z" fill="url(#f_cream)"/>
        </g>
        <path d="M120 -176 L150 -160 L246 -70 L262 -40 L236 -30 L214 -52 L112 -126Z" fill="url(#f_furDark)" stroke="#6b2d0e" stroke-width="2" stroke-linejoin="round"/>
        <path d="M236 -66 L262 -40 L236 -30 L218 -50Z" fill="#241510"/>
        <path d="M-84 -176 L-108 -150 L-196 -96 L-222 -92 L-222 -70 L-186 -68 L-92 -108Z" fill="url(#f_furDark)" stroke="#6b2d0e" stroke-width="2" stroke-linejoin="round"/>
        <path d="M-196 -96 L-224 -92 L-224 -70 L-192 -70Z" fill="#241510"/>
        <path d="M-112 -192 C-82 -248 40 -252 120 -228 C172 -210 172 -166 122 -150 C40 -130 -60 -128 -106 -150 C-120 -160 -120 -176 -112 -192Z" fill="url(#f_fur)" stroke="#6b2d0e" stroke-width="2.2" stroke-linejoin="round"/>
        <path d="M-100 -140 C-50 -126 40 -126 110 -146 C60 -134 -30 -134 -100 -140Z" fill="url(#f_cream)" opacity=".9"/>
        <path d="M100 -170 L130 -150 L226 -58 L248 -26 L222 -16 L200 -40 L96 -118Z" fill="url(#f_fur)" stroke="#6b2d0e" stroke-width="2" stroke-linejoin="round"/>
        <path d="M222 -54 L248 -26 L222 -16 L204 -38Z" fill="#241510"/>
        <path d="M-70 -176 L-92 -146 L-178 -80 L-204 -72 L-204 -52 L-166 -52 L-76 -100Z" fill="url(#f_fur)" stroke="#6b2d0e" stroke-width="2" stroke-linejoin="round"/>
        <path d="M-178 -80 L-206 -72 L-206 -52 L-174 -54Z" fill="#241510"/>
        <g transform="translate(-70 -20) rotate(-8 -100 -225)">${foxHead()}</g>
      </g>
    </g>`;
  }

  window.SK3 = { defs, ali, fox, bread };
})();
