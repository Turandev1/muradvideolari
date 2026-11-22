const { chromium } = require('playwright');
(async () => {
  const [,, html, out] = process.argv;
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 });
  p.on('pageerror', e => console.log('ERR', e.message));
  await p.goto('file://' + html); await p.waitForTimeout(800);
  await p.evaluate(() => {
    const tl = window.__timelines.main; tl.seek(26.0);
    const GY = 1190, s = 1.6;
    gsap.set('#cam', { x: 540 - s * 700, y: 1250 - s * 1020, scale: s });
    gsap.set('#sway', { x: 0, y: 0, rotation: 0 });
    document.querySelectorAll('.cap,#end,#sunset').forEach(e => e.style.display = 'none');
    gsap.set('.ali-tear-r', { opacity: 1, y: 10 });
    gsap.set('.ali-m-sad', { opacity: 1 }); gsap.set('.ali-m-open,.ali-m-smile,.ali-m-flat', { opacity: 0 });
    gsap.set('.ali-pupil', { x: 5, y: 2 });
    gsap.set('.fox-stand .fox-head', { rotation: -6 });
    const o = document.createElement('div');
    o.innerHTML = `
      <div style="position:absolute;left:0;right:0;top:0;height:760px;background:radial-gradient(ellipse 80% 70% at 50% 40%, rgba(255,214,120,.55), rgba(255,180,90,0) 72%)"></div>
      <div style="position:absolute;left:0;right:0;top:250px;text-align:center;font-family:'Lilita One';font-size:150px;line-height:.95;color:#fff;letter-spacing:2px;-webkit-text-stroke:20px #2a1450;paint-order:stroke fill;text-shadow:0 14px 0 rgba(42,20,80,.65);transform:rotate(-3deg)">THE <span style="color:#ffd66b">SNEAKY</span><br>FOX!</div>
      <div style="position:absolute;left:0;right:0;top:600px;text-align:center"><span style="display:inline-block;padding:14px 40px;border-radius:60px;background:#e8553f;font-family:'Baloo 2';font-weight:800;font-size:58px;color:#fff;-webkit-text-stroke:8px #6e1a10;paint-order:stroke fill;box-shadow:0 10px 0 #7d2415">She tricked Ali!</span></div>
      <div style="position:absolute;left:0;right:0;bottom:250px;text-align:center;font-family:'Lilita One';font-size:84px;color:#ffd66b;-webkit-text-stroke:14px #2a1450;paint-order:stroke fill;text-shadow:0 8px 0 rgba(42,20,80,.6)">Would YOU share?</div>`;
    o.style.cssText = 'position:absolute;inset:0;z-index:50;pointer-events:none';
    document.querySelector('#root').appendChild(o);
  });
  await p.waitForTimeout(300);
  await p.screenshot({ path: out });
  await b.close();
})();
