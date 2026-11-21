const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const http = require('http');

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function getJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
}

async function capture() {
  const tempDir = path.join(process.env.TEMP || '.', 'chrome_em_' + Date.now());
  fs.mkdirSync(tempDir, { recursive: true });

  const chromeProc = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--disable-gpu',
    '--remote-debugging-port=9222',
    `--user-data-dir=${tempDir}`,
    'http://localhost:8080'
  ], { stdio: 'ignore' });

  let targets = null;
  for (let i = 0; i < 20; i++) {
    await sleep(500);
    try {
      targets = await getJson('http://127.0.0.1:9222/json/list');
      if (targets && targets.length > 0) break;
    } catch (e) {}
  }

  const pageTarget = targets.find(t => t.type === 'page') || targets[0];
  const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);

  let idCounter = 1;
  const pending = new Map();
  function sendCmd(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = idCounter++;
      pending.set(id, { resolve, reject });
      ws.send(JSON.stringify({ id, method, params }));
    });
  }

  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id);
      pending.delete(msg.id);
      if (msg.error) reject(msg.error);
      else resolve(msg.result);
    }
  };

  await new Promise(r => ws.onopen = r);
  await sendCmd('Page.enable');
  await sendCmd('Runtime.enable');
  await sendCmd('Emulation.setDeviceMetricsOverride', { width: 1200, height: 900, deviceScaleFactor: 1, mobile: false });

  await sleep(1500);

  // Remove preloader
  await sendCmd('Runtime.evaluate', {
    expression: `(function() {
      const p = document.getElementById('preloader');
      if (p) p.remove();
    })()`
  });

  await sleep(1000);

  // 1. Capture Hero Screen
  let shot = await sendCmd('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('preview-emerald-hero.png', Buffer.from(shot.data, 'base64'));

  // 2. Open Envelope Modal and capture
  await sendCmd('Runtime.evaluate', {
    expression: `(function() {
      const btn = document.getElementById('openInvitationBtn');
      if (btn) btn.click();
    })()`
  });
  await sleep(1200);
  shot = await sendCmd('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('preview-emerald-envelope.png', Buffer.from(shot.data, 'base64'));

  // Close Envelope modal
  await sendCmd('Runtime.evaluate', {
    expression: `(function() {
      const m = document.getElementById('envelopeModal');
      if (m) { m.hidden = true; m.classList.remove('active'); }
      document.body.style.overflow = '';
      document.getElementById('couple').scrollIntoView();
    })()`
  });
  await sleep(1200);

  // 3. Capture Couple Section
  shot = await sendCmd('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('preview-emerald-couple.png', Buffer.from(shot.data, 'base64'));

  // 4. Capture Blessings Section
  await sendCmd('Runtime.evaluate', {
    expression: `(function() {
      document.getElementById('blessings').scrollIntoView();
    })()`
  });
  await sleep(1200);
  shot = await sendCmd('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('preview-emerald-blessings.png', Buffer.from(shot.data, 'base64'));

  ws.close();
  chromeProc.kill();
  try { fs.rmSync(tempDir, { recursive: true, force: true }); } catch (e) {}
  console.log('📸 All emerald screenshots captured successfully!');
}

capture().catch(console.error);

