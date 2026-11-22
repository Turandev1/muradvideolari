/* story-kids — Ali (little boy) and Fox (sneaky fox) + bread. SVG markup generators (v1).
 * Usage: el.innerHTML = window.SK2.ali();  / .fox() / .bread()
 * Origin (0,0) = centre of the feet on the ground; the character is drawn upward (negative y).
 * Ali faces the camera (≈550 tall). Fox faces LEFT (≈345 tall, ≈330 wide).
 * Animate parts by class: .ali-legL/.ali-legR/.ali-armL/.ali-armR/.ali-head/.ali-lid/.ali-pupil/
 *   .ali-m-smile/.ali-m-sad/.ali-m-open/.ali-m-flat/.ali-tear ; .fox-head/.fox-tail/.fox-lid/
 *   .fox-m-smirk/.fox-m-open/.fox-tear/.fox-paw/.fox-bread
 */
(function () {
  const INK = "#2b1a10";
  const SKIN = "#F5C69C";

  function bread(s) {
    return `<g transform="scale(${s || 1})">
      <ellipse cx="0" cy="0" rx="62" ry="30" fill="#E7A545" stroke="${INK}" stroke-width="6"/>
      <path d="M-34 -20 Q-26 -4 -34 8 M-6 -26 Q2 -8 -6 6 M22 -22 Q30 -6 22 8" stroke="#C47E26" stroke-width="6" fill="none" stroke-linecap="round"/>
      <ellipse cx="-16" cy="-14" rx="26" ry="8" fill="#FFE9A8" opacity=".85"/>
    </g>`;
  }

  function ali() {
    const leg = (side, x) => `<g class="ali-leg${side}" style="transform-origin:${x}px -160px">
        <rect x="${x - 17}" y="-165" width="34" height="140" rx="15" fill="${SKIN}" stroke="${INK}" stroke-width="6"/>
        <ellipse cx="${x + (x < 0 ? -4 : 4)}" cy="-20" rx="42" ry="23" fill="#6B4226" stroke="${INK}" stroke-width="6"/>
      </g>`;
    const arm = (side, sx) => `<g class="ali-arm${side}" style="transform-origin:${sx}px -355px">
        <path d="M${sx} -355 Q${sx * 1.35} -310 ${sx * 0.62} -285" stroke="${INK}" stroke-width="50" stroke-linecap="round" fill="none"/>
        <path d="M${sx} -355 Q${sx * 1.35} -310 ${sx * 0.62} -285" stroke="#E8553F" stroke-width="37" stroke-linecap="round" fill="none"/>
        <circle cx="${sx * 0.62}" cy="-283" r="23" fill="${SKIN}" stroke="${INK}" stroke-width="6"/>
      </g>`;
    const eye = (x) => `<g>
        <ellipse cx="${x}" cy="-440" rx="25" ry="29" fill="#fff" stroke="${INK}" stroke-width="5"/>
        <g class="ali-pupil"><circle cx="${x + 3}" cy="-436" r="15" fill="#4a2c16"/><circle cx="${x + 3}" cy="-436" r="9" fill="#1b0f08"/>
          <circle cx="${x - 3}" cy="-443" r="6" fill="#fff"/><circle cx="${x + 9}" cy="-429" r="3" fill="#fff" opacity=".85"/></g>
        <rect class="ali-lid" x="${x - 29}" y="-472" width="58" height="62" fill="${SKIN}" style="transform-box:fill-box;transform-origin:50% 0;transform:scaleY(0)"/>
      </g>`;
    return `<g class="ali">
      <ellipse cx="0" cy="4" rx="120" ry="19" fill="rgba(40,25,10,.28)"/>
      <g class="ali-body" style="transform-origin:0px 0px">
        ${leg("L", -40)}${leg("R", 40)}
        <rect x="-76" y="-262" width="152" height="112" rx="28" fill="#3C6FB5" stroke="${INK}" stroke-width="6"/>
        <rect x="-82" y="-395" width="164" height="175" rx="42" fill="#E8553F" stroke="${INK}" stroke-width="6"/>
        <path d="M-30 -394 Q0 -362 30 -394" fill="#FFE2C4" stroke="${INK}" stroke-width="5"/>
        ${arm("L", -82)}${arm("R", 82)}
        <g class="ali-head" style="transform-origin:0px -400px">
          <circle cx="-100" cy="-428" r="17" fill="${SKIN}" stroke="${INK}" stroke-width="5"/>
          <circle cx="100" cy="-428" r="17" fill="${SKIN}" stroke="${INK}" stroke-width="5"/>
          <circle cx="0" cy="-445" r="104" fill="${SKIN}" stroke="${INK}" stroke-width="6"/>
          <path d="M-104 -450 Q-112 -560 0 -556 Q112 -560 104 -450 Q70 -508 8 -496 Q-50 -508 -104 -450Z" fill="#5A3A22" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
          <path d="M-20 -552 Q-8 -586 18 -566" stroke="#5A3A22" stroke-width="12" fill="none" stroke-linecap="round"/>
          ${eye(-40)}${eye(40)}
          <path class="ali-brow ali-brow-l" d="M-68 -482 Q-42 -496 -18 -482" stroke="#3b2414" stroke-width="7" fill="none" stroke-linecap="round"/>
          <path class="ali-brow ali-brow-r" d="M18 -482 Q42 -496 68 -482" stroke="#3b2414" stroke-width="7" fill="none" stroke-linecap="round"/>
          <ellipse cx="-66" cy="-402" rx="19" ry="12" fill="#FF8F8F" opacity=".55"/>
          <ellipse cx="66" cy="-402" rx="19" ry="12" fill="#FF8F8F" opacity=".55"/>
          <path class="ali-m-smile" d="M-24 -396 Q0 -374 24 -396" stroke="${INK}" stroke-width="6" fill="none" stroke-linecap="round"/>
          <path class="ali-m-sad" d="M-22 -380 Q0 -402 22 -380" stroke="${INK}" stroke-width="6" fill="none" stroke-linecap="round" opacity="0"/>
          <path class="ali-m-flat" d="M-18 -388 L18 -388" stroke="${INK}" stroke-width="6" fill="none" stroke-linecap="round" opacity="0"/>
          <ellipse class="ali-m-open" cx="0" cy="-386" rx="16" ry="14" fill="#7a2a2a" stroke="${INK}" stroke-width="5" opacity="0"/>
          <path class="ali-tear ali-tear-l" d="M-44 -420 Q-52 -400 -44 -392 Q-36 -400 -44 -420Z" fill="#9fdcff" stroke="#4aa3d8" stroke-width="3" opacity="0"/>
          <path class="ali-tear ali-tear-r" d="M44 -420 Q36 -400 44 -392 Q52 -400 44 -420Z" fill="#9fdcff" stroke="#4aa3d8" stroke-width="3" opacity="0"/>
        </g>
      </g>
    </g>`;
  }

  function fox() {
    const leg = (x, c) => `<g class="fox-leg" style="transform-origin:${x}px -110px"><rect x="${x - 15}" y="-112" width="30" height="102" rx="13" fill="${c}" stroke="${INK}" stroke-width="6"/>
      <ellipse cx="${x - 4}" cy="-10" rx="25" ry="12" fill="#4a2a12" stroke="${INK}" stroke-width="5"/></g>`;
    return `<g class="fox">
      <ellipse cx="20" cy="4" rx="170" ry="19" fill="rgba(40,25,10,.28)"/>
      <g class="fox-body" style="transform-origin:0px 0px">
        <g class="fox-tail" style="transform-origin:110px -160px">
          <path d="M100 -170 C190 -300 350 -260 340 -130 C310 -170 260 -130 190 -120 C150 -115 120 -120 100 -120Z" fill="#F28C28" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
          <path d="M300 -250 C345 -250 345 -170 336 -130 C318 -158 292 -150 275 -146 C290 -180 296 -215 300 -250Z" fill="#FFF3DC" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
        </g>
        ${leg(-60, "#E37B1C")}${leg(95, "#E37B1C")}
        <ellipse cx="20" cy="-160" rx="125" ry="72" fill="#F28C28" stroke="${INK}" stroke-width="6"/>
        <path d="M-70 -120 Q20 -88 110 -120 Q60 -98 20 -96 Q-30 -98 -70 -120Z" fill="#FFF3DC"/>
        ${leg(-20, "#F28C28")}${leg(60, "#F28C28")}
        <g class="fox-head" style="transform-origin:-110px -215px">
          <path d="M-96 -268 L-78 -352 L-36 -282Z" fill="#F28C28" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
          <path d="M-86 -280 L-78 -330 L-54 -286Z" fill="#FFB6A0"/>
          <path d="M-150 -272 L-152 -356 L-108 -288Z" fill="#E37B1C" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
          <ellipse cx="-118" cy="-225" rx="80" ry="64" fill="#F28C28" stroke="${INK}" stroke-width="6"/>
          <path d="M-190 -226 Q-200 -190 -150 -168 Q-100 -150 -62 -190 Q-100 -200 -130 -214 Q-160 -232 -190 -226Z" fill="#FFF3DC"/>
          <ellipse cx="-188" cy="-222" rx="44" ry="30" fill="#FFF3DC" stroke="${INK}" stroke-width="6"/>
          <circle cx="-226" cy="-230" r="12" fill="#2b1a10"/>
          <g>
            <ellipse cx="-132" cy="-246" rx="22" ry="26" fill="#fff" stroke="${INK}" stroke-width="5"/>
            <g class="fox-pupil"><circle cx="-138" cy="-244" r="14" fill="#3a2010"/><circle cx="-138" cy="-244" r="8" fill="#150a04"/><circle cx="-144" cy="-251" r="6" fill="#fff"/></g>
            <rect class="fox-lid" x="-158" y="-276" width="52" height="56" fill="#F28C28" style="transform-box:fill-box;transform-origin:50% 0;transform:scaleY(0)"/>
            <path class="fox-brow" d="M-158 -278 Q-132 -292 -108 -278" stroke="#7a3a0c" stroke-width="7" fill="none" stroke-linecap="round"/>
          </g>
          <path class="fox-m-smirk" d="M-214 -202 Q-186 -184 -150 -202" stroke="${INK}" stroke-width="6" fill="none" stroke-linecap="round"/>
          <g class="fox-m-open" opacity="0"><path d="M-216 -204 Q-186 -158 -148 -204Z" fill="#7a2a2a" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/><ellipse cx="-184" cy="-184" rx="14" ry="8" fill="#ff8a9a"/></g>
          <ellipse cx="-98" cy="-212" rx="16" ry="10" fill="#FF8F8F" opacity=".5"/>
          <path class="fox-tear" d="M-140 -222 Q-152 -196 -140 -184 Q-128 -196 -140 -222Z" fill="#9fdcff" stroke="#4aa3d8" stroke-width="3" opacity="0"/>
          <g class="fox-bread" opacity="0" transform="translate(-205 -178) rotate(-8)">${bread(0.55)}</g>
          <g class="fox-paw" opacity="0"><circle cx="-118" cy="-282" r="26" fill="#4a2a12" stroke="${INK}" stroke-width="5"/></g>
        </g>
      </g>
    </g>`;
  }

  window.SK2 = { ali, fox, bread };
})();
