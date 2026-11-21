const fs = require('fs');
const path = require('path');

// 1. UPDATE style.css
let css = fs.readFileSync('style.css', 'utf8');

// Replace palette comment
css = css.replace(
  /Colors:\s*Ivory\/Cream,\s*Deep Maroon,\s*Lustrous Gold/g,
  'Colors: Pearl Ivory, Regal Emerald Green, Antique Lustrous Gold'
);

// Replace root color variables
css = css.replace(
  /--color-maroon-darkest:\s*#1e0307;/g,
  `--color-maroon-darkest: #071912;\n  --color-emerald-darkest: #071912;`
);
css = css.replace(
  /--color-maroon-dark:\s*#32070e;/g,
  `--color-maroon-dark: #0c2b20;\n  --color-emerald-dark: #0c2b20;`
);
css = css.replace(
  /--color-maroon:\s*#4a0e17;/g,
  `--color-maroon: #134231;\n  --color-emerald: #134231;`
);
css = css.replace(
  /--color-maroon-light:\s*#6a1422;/g,
  `--color-maroon-light: #1b5641;\n  --color-emerald-light: #1b5641;`
);
css = css.replace(
  /--color-maroon-accent:\s*#8b1c2d;/g,
  `--color-maroon-accent: #257457;\n  --color-emerald-accent: #257457;`
);

css = css.replace(
  /--color-maroon-gradient:\s*linear-gradient\(135deg,\s*#4a0e17 0%,\s*#30060d 100%\);/g,
  '--color-maroon-gradient: linear-gradient(135deg, #134231 0%, #0a251b 100%);'
);

// Replace shadows
css = css.replace(
  /--shadow-royal:\s*0 15px 45px rgba\(50, 7, 14, 0\.35\);/g,
  '--shadow-royal: 0 15px 45px rgba(12, 43, 32, 0.35);'
);

// Replace body & text colors
css = css.replace(/color:\s*#3b282b;/g, 'color: #213028;');
css = css.replace(/color:\s*#665053;/g, 'color: #3d4f46;');
css = css.replace(/color:\s*#554144;/g, 'color: #32443a;');
css = css.replace(/color:\s*#634d51;/g, 'color: #394c42;');
css = css.replace(/color:\s*#4b3639;/g, 'color: #2d3d35;');
css = css.replace(/color:\s*#7a6366;/g, 'color: #45594f;');
css = css.replace(/color:\s*#4a383a;/g, 'color: #2d3d35;');
css = css.replace(/color:\s*#4a3437;/g, 'color: #2c3c34;');
css = css.replace(/color:\s*#443134;/g, 'color: #283830;');
css = css.replace(/color:\s*#776063;/g, 'color: #45584e;');

// Replace Envelope colors
css = css.replace(/background:\s*#500e18;/g, 'background: #0f3627;');
css = css.replace(/border-top:\s*170px solid #6b1422;/g, 'border-top: 170px solid #164f3a;');
css = css.replace(/border-left:\s*260px solid #430c14;/g, 'border-left: 260px solid #0b281d;');
css = css.replace(/border-right:\s*260px solid #430c14;/g, 'border-right: 260px solid #0b281d;');
css = css.replace(/border-bottom:\s*170px solid #5a101d;/g, 'border-bottom: 170px solid #134231;');

// Replace Lightbox & Modal
css = css.replace(/background:\s*#110204;/g, 'background: #06150e;');
css = css.replace(/background:\s*rgba\(30, 3, 7, 0\.8\);/g, 'background: rgba(7, 25, 18, 0.85);');
css = css.replace(/background:\s*radial-gradient\(circle at center,\s*#3d0711 0%,\s*#1c0205 100%\);/g, 'background: radial-gradient(circle at center, #103325 0%, #05130d 100%);');

fs.writeFileSync('style.css', css, 'utf8');
console.log('✅ style.css successfully updated to Regal Emerald Green & Antique Gold');

// 2. UPDATE index.html attire
let html = fs.readFileSync('index.html', 'utf8');
html = html.replace(
  'Regal Royal Maroon, Ivory &amp; Gold',
  'Regal Emerald Green, Pearl Ivory &amp; Antique Gold'
);
fs.writeFileSync('index.html', html, 'utf8');
console.log('✅ index.html attire updated');

// 3. UPDATE script.js petal colors
let js = fs.readFileSync('script.js', 'utf8');
js = js.replace(
  /const colors = \[\s*'rgba\(214, 48, 77, ',\s*'rgba\(180, 24, 52, ',\s*'rgba\(240, 98, 126, ',\s*'rgba\(224, 169, 58, '\s*\];/g,
  `const colors = [\n          'rgba(26, 92, 66, ',\n          'rgba(40, 130, 94, ',\n          'rgba(212, 175, 55, ',\n          'rgba(245, 194, 66, '\n        ];`
);
fs.writeFileSync('script.js', js, 'utf8');
console.log('✅ script.js petal colors updated');

// 4. UPDATE images/wax-seal.svg
let wax = fs.readFileSync('images/wax-seal.svg', 'utf8');
wax = wax.replace(/stop-color="#d32f2f"/g, 'stop-color="#2d805d"');
wax = wax.replace(/stop-color="#8b0000"/g, 'stop-color="#16543b"');
wax = wax.replace(/stop-color="#4a0000"/g, 'stop-color="#0d3827"');
wax = wax.replace(/stop-color="#2a0000"/g, 'stop-color="#061d14"');
fs.writeFileSync('images/wax-seal.svg', wax, 'utf8');
console.log('✅ wax-seal.svg updated to emerald wax');

// 5. UPDATE favicon.svg
let fav = fs.readFileSync('favicon.svg', 'utf8');
fav = fav.replace(/stop-color="#6a1422"/g, 'stop-color="#1b5641"');
fav = fav.replace(/stop-color="#2a050a"/g, 'stop-color="#061d14"');
fs.writeFileSync('favicon.svg', fav, 'utf8');
console.log('✅ favicon.svg updated');

// 6. UPDATE images/hero-bg.svg
let hero = fs.readFileSync('images/hero-bg.svg', 'utf8');
hero = hero.replace(/stop-color="#220409"/g, 'stop-color="#051912"');
hero = hero.replace(/stop-color="#3d0912"/g, 'stop-color="#0b2c20"');
hero = hero.replace(/stop-color="#4d0e19"/g, 'stop-color="#123f2f"');
hero = hero.replace(/stop-color="#210307"/g, 'stop-color="#04140e"');
hero = hero.replace(/stop-color="#2a050b"/g, 'stop-color="#082118"');
hero = hero.replace(/fill="#180205"/g, 'fill="#051610"');
hero = hero.replace(/fill="#2d050c"/g, 'fill="#0a291e"');
fs.writeFileSync('images/hero-bg.svg', hero, 'utf8');
console.log('✅ hero-bg.svg updated');

// 7. UPDATE images/venue.svg
let venue = fs.readFileSync('images/venue.svg', 'utf8');
venue = venue.replace(/stop-color="#1e0408"/g, 'stop-color="#051912"');
venue = venue.replace(/stop-color="#3d0913"/g, 'stop-color="#0e3526"');
venue = venue.replace(/stop-color="#641120"/g, 'stop-color="#18563f"');
venue = venue.replace(/fill="#210307"/g, 'fill="#071d15"');
venue = venue.replace(/fill="#2d050c"/g, 'fill="#0b2c20"');
fs.writeFileSync('images/venue.svg', venue, 'utf8');
console.log('✅ venue.svg updated');

// 8. UPDATE gallery svgs
const galleryFiles = [
  'images/gallery-1.svg', 'images/gallery-2.svg', 'images/gallery-3.svg',
  'images/gallery-4.svg', 'images/gallery-5.svg', 'images/gallery-6.svg',
  'images/couple-story.svg'
];

galleryFiles.forEach(f => {
  if (fs.existsSync(f)) {
    let c = fs.readFileSync(f, 'utf8');
    c = c.replace(/#3d0711|#4a0d19|#4a0f19|#460b18|#3d0713|#3b0811/g, '#0e3526');
    c = c.replace(/#180205|#220409|#1f0307|#190205|#1a0206|#2a050c/g, '#051912');
    c = c.replace(/#540f1c/g, '#164d39');
    c = c.replace(/#2a050d/g, '#061d14');
    c = c.replace(/#551221/g, '#134231');
    c = c.replace(/#801b2f/g, '#1e5e47');
    fs.writeFileSync(f, c, 'utf8');
    console.log(`✅ ${f} updated`);
  }
});

