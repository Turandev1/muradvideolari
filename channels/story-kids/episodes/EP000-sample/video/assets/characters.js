/* story-kids recurring characters — SVG markup generators (v1).
 * Usage in a composition: <script src="assets/characters.js"></script>
 *   el.innerHTML = window.SK.defs();            // once, in a 0x0 <svg>
 *   g.innerHTML  = window.SK.pip();             // Pip, viewBox 0 0 400 400 (feet ≈ y 360, hands ≈ 200,312)
 *   g.innerHTML  = window.SK.twinkle();         // Twinkle the star, centred on 0,0 (radius ≈ 75)
 * Animate parts by class inside a scoped container (e.g. "#s2 .pip-eyeball").
 */
(function () {
  const OUT = "#2F6B2A";
  const SKIN = "#7CC24F";

  function defs() {
    return `
    <radialGradient id="pipSkin" cx="38%" cy="28%" r="80%">
      <stop offset="0" stop-color="#C2F07A"/><stop offset=".5" stop-color="${SKIN}"/><stop offset="1" stop-color="#4A9334"/>
    </radialGradient>
    <linearGradient id="pipSkinDark" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#6DB443"/><stop offset="1" stop-color="#3D7C2B"/>
    </linearGradient>
    <radialGradient id="pipBelly" cx="50%" cy="35%" r="70%">
      <stop offset="0" stop-color="#F8FDDC"/><stop offset="1" stop-color="#D3EC95"/>
    </radialGradient>
    <radialGradient id="pipIris" cx="40%" cy="35%" r="70%">
      <stop offset="0" stop-color="#C08A48"/><stop offset="1" stop-color="#5A3A1E"/>
    </radialGradient>
    <radialGradient id="starGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0" stop-color="#FFF6C8" stop-opacity=".95"/><stop offset=".35" stop-color="#FFE07A" stop-opacity=".45"/>
      <stop offset="1" stop-color="#FFD66B" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="starFill" cx="42%" cy="35%" r="70%">
      <stop offset="0" stop-color="#FFFBE6"/><stop offset=".45" stop-color="#FFE586"/><stop offset="1" stop-color="#FFB940"/>
    </radialGradient>`;
  }

  function eye(cx, cy, side) {
    return `
    <g class="pip-eye pip-eye-${side}">
      <circle cx="${cx}" cy="${cy}" r="58" fill="url(#pipSkin)" stroke="${OUT}" stroke-width="6"/>
      <g class="pip-eyeball">
        <circle cx="${cx}" cy="${cy + 2}" r="44" fill="#FFFFFF" stroke="${OUT}" stroke-width="3"/>
        <g class="pip-iris">
          <circle cx="${cx + 4}" cy="${cy + 8}" r="26" fill="url(#pipIris)"/>
          <circle cx="${cx + 4}" cy="${cy + 8}" r="14" fill="#1E1410"/>
          <circle cx="${cx - 5}" cy="${cy - 2}" r="9" fill="#FFFFFF"/>
          <circle cx="${cx + 13}" cy="${cy + 17}" r="4" fill="#FFFFFF" opacity=".85"/>
        </g>
      </g>
      <path d="M${cx - 26} ${cy - 70} Q${cx} ${cy - 84} ${cx + 26} ${cy - 70}" stroke="${OUT}" stroke-width="7" fill="none" stroke-linecap="round"/>
    </g>`;
  }

  function arm(side) {
    const l = side === "l";
    const d = l ? "M96 252 Q90 314 166 312" : "M304 252 Q310 314 234 312";
    const hx = l ? 172 : 228, f = l ? 1 : -1;
    return `
    <g class="pip-arm-${side}">
      <path d="${d}" stroke="${OUT}" stroke-width="32" fill="none" stroke-linecap="round"/>
      <path d="${d}" stroke="${SKIN}" stroke-width="21" fill="none" stroke-linecap="round"/>
      <circle cx="${hx + 13 * f}" cy="297" r="8" fill="${SKIN}" stroke="${OUT}" stroke-width="4"/>
      <circle cx="${hx + 17 * f}" cy="312" r="8" fill="${SKIN}" stroke="${OUT}" stroke-width="4"/>
      <circle cx="${hx + 10 * f}" cy="325" r="8" fill="${SKIN}" stroke="${OUT}" stroke-width="4"/>
      <circle cx="${hx}" cy="310" r="17" fill="${SKIN}" stroke="${OUT}" stroke-width="5"/>
    </g>`;
  }

  function pip() {
    const toes = [[60, 354], [78, 368], [340, 354], [322, 368]]
      .map(([x, y]) => `<circle cx="${x}" cy="${y}" r="12" fill="${SKIN}" stroke="${OUT}" stroke-width="5"/>`).join("");
    const petals = [0, 72, 144, 216, 288]
      .map((r) => `<ellipse cx="0" cy="-20" rx="13" ry="22" transform="rotate(${r})" fill="#FF94BC" stroke="#C94F7C" stroke-width="3"/>`).join("");
    return `
    <g class="pip-root">
      <ellipse cx="200" cy="372" rx="138" ry="18" fill="#0B0A2A" opacity=".22"/>
      <g class="pip-legs">
        <ellipse cx="112" cy="350" rx="60" ry="25" fill="url(#pipSkinDark)" stroke="${OUT}" stroke-width="5"/>
        <ellipse cx="288" cy="350" rx="60" ry="25" fill="url(#pipSkinDark)" stroke="${OUT}" stroke-width="5"/>
        ${toes}
      </g>
      <g class="pip-body">
        <path d="M200 150 C300 150 345 210 340 270 C335 335 280 362 200 362 C120 362 65 335 60 270 C55 210 100 150 200 150Z"
              fill="url(#pipSkin)" stroke="${OUT}" stroke-width="6"/>
        <circle cx="96" cy="232" r="10" fill="#5A9F3B" opacity=".7"/>
        <circle cx="312" cy="236" r="8" fill="#5A9F3B" opacity=".7"/>
        <circle cx="300" cy="212" r="5" fill="#5A9F3B" opacity=".7"/>
        <ellipse cx="200" cy="300" rx="94" ry="58" fill="url(#pipBelly)"/>
        <ellipse cx="118" cy="252" rx="23" ry="12" fill="#FF8FA3" opacity=".75"/>
        <ellipse cx="282" cy="252" rx="23" ry="12" fill="#FF8FA3" opacity=".75"/>
        <ellipse cx="186" cy="222" rx="4" ry="3" fill="#2F6B2A" opacity=".8"/>
        <ellipse cx="214" cy="222" rx="4" ry="3" fill="#2F6B2A" opacity=".8"/>
        <path class="pip-mouth-smile" d="M160 244 Q200 280 240 244" stroke="#2A5420" stroke-width="7" fill="none" stroke-linecap="round"/>
        <g class="pip-mouth-wow" opacity="0">
          <ellipse cx="200" cy="258" rx="17" ry="21" fill="#7A2E3A" stroke="#2A5420" stroke-width="5"/>
          <ellipse cx="200" cy="268" rx="9" ry="6" fill="#E46A7E"/>
        </g>
      </g>
      ${eye(136, 150, "l")}
      ${eye(264, 150, "r")}
      <g class="pip-flower" transform="translate(322 104)">${petals}<circle r="9" fill="#FFD66B" stroke="#E0A12E" stroke-width="3"/></g>
      ${arm("l")}
      ${arm("r")}
    </g>`;
  }

  function starPath(R, r) {
    let d = "";
    for (let i = 0; i < 10; i++) {
      const a = -Math.PI / 2 + (i * Math.PI) / 5;
      const rad = i % 2 ? r : R;
      d += (i ? "L" : "M") + (Math.cos(a) * rad).toFixed(1) + " " + (Math.sin(a) * rad).toFixed(1);
    }
    return d + "Z";
  }

  function twinkle() {
    return `
    <g class="tw-root">
      <circle class="tw-glow" r="150" fill="url(#starGlow)"/>
      <g class="tw-body">
        <path d="${starPath(70, 36)}" fill="url(#starFill)" stroke="#F4A938" stroke-width="16" stroke-linejoin="round"/>
        <path d="${starPath(70, 36)}" fill="url(#starFill)"/>
        <path d="M-30 -18 Q-22 -40 -8 -48" stroke="#FFFFFF" stroke-width="7" fill="none" stroke-linecap="round" opacity=".8"/>
        <ellipse cx="-30" cy="12" rx="10" ry="6" fill="#FF9AA8" opacity=".8"/>
        <ellipse cx="30" cy="12" rx="10" ry="6" fill="#FF9AA8" opacity=".8"/>
        <g class="tw-eyes-open" opacity="0">
          <g class="tw-eyeball">
            <ellipse cx="-17" cy="-4" rx="7.5" ry="10.5" fill="#3A2410"/>
            <ellipse cx="17" cy="-4" rx="7.5" ry="10.5" fill="#3A2410"/>
            <circle cx="-19" cy="-8" r="3.2" fill="#FFF"/><circle cx="15" cy="-8" r="3.2" fill="#FFF"/>
          </g>
        </g>
        <g class="tw-eyes-closed">
          <path d="M-25 -3 Q-17 4 -9 -3" stroke="#3A2410" stroke-width="4.5" fill="none" stroke-linecap="round"/>
          <path d="M9 -3 Q17 4 25 -3" stroke="#3A2410" stroke-width="4.5" fill="none" stroke-linecap="round"/>
        </g>
        <ellipse class="tw-mouth" cx="0" cy="17" rx="8" ry="5.5" fill="#8A3A2A"/>
      </g>
    </g>`;
  }

  window.SK = { defs, pip, twinkle, starPath };
})();
