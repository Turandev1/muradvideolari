// node export-svg.cjs → writes pip/pip-v1.svg and twinkle/twinkle-v1.svg from characters.js
const fs = require("fs"); global.window = {};
eval(fs.readFileSync(__dirname + "/characters.js", "utf8"));
const SK = window.SK;
const wrap = (vb, body) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" width="800" height="800"><defs>${SK.defs()}</defs>${body}</svg>\n`;
fs.writeFileSync(__dirname + "/pip/pip-v1.svg", wrap("0 0 400 400", SK.pip()));
fs.writeFileSync(__dirname + "/twinkle/twinkle-v1.svg", wrap("-160 -160 320 320", SK.twinkle().replace('class="tw-eyes-open" opacity="0"', 'class="tw-eyes-open" opacity="1"').replace('<g class="tw-eyes-closed">', '<g class="tw-eyes-closed" opacity="0">')));
console.log("ok");
