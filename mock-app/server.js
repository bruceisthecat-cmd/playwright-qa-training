// Zero-dependency mock of the telemetry dashboard. Stands in for the real app.
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 4173;
const PUBLIC = path.join(__dirname, 'public');
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css' };

// 30s mono 8-bit 440Hz tone, generated in memory so no binary asset is needed.
function tone(seconds = 30, rate = 8000) {
  const n = seconds * rate;
  const b = Buffer.alloc(44 + n);
  b.write('RIFF', 0); b.writeUInt32LE(36 + n, 4); b.write('WAVEfmt ', 8);
  b.writeUInt32LE(16, 16); b.writeUInt16LE(1, 20); b.writeUInt16LE(1, 22);
  b.writeUInt32LE(rate, 24); b.writeUInt32LE(rate, 28); b.writeUInt16LE(1, 32);
  b.writeUInt16LE(8, 34); b.write('data', 36); b.writeUInt32LE(n, 40);
  for (let i = 0; i < n; i++) b[44 + i] = 128 + Math.round(60 * Math.sin((2 * Math.PI * 440 * i) / rate));
  return b;
}
const WAV = tone();

http.createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost');

  if (url.pathname === '/api/v1/system-status') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ status: 'ok' }));
  }

  // Server-Sent Events: one data point per second.
  if (url.pathname === '/api/v1/telemetry/stream') {
    res.writeHead(200, { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache', Connection: 'keep-alive' });
    let seq = 0;
    const send = () => {
      seq++;
      res.write(`data: ${JSON.stringify({ seq, value: Math.round(50 + 30 * Math.sin(seq / 2)) })}\n\n`);
    };
    send();
    const t = setInterval(send, 1000);
    req.on('close', () => clearInterval(t));
    return;
  }

  if (url.pathname === '/media/tone.wav') {
    res.writeHead(200, { 'Content-Type': 'audio/wav', 'Content-Length': WAV.length });
    return res.end(WAV);
  }

  const file = url.pathname === '/' ? 'index.html' : url.pathname.slice(1);
  const full = path.join(PUBLIC, path.normalize(file));
  if (!full.startsWith(PUBLIC) || !fs.existsSync(full)) {
    res.writeHead(404);
    return res.end('Not found');
  }
  res.writeHead(200, { 'Content-Type': TYPES[path.extname(full)] || 'text/plain' });
  fs.createReadStream(full).pipe(res);
}).listen(PORT, () => console.log(`Mock app on http://localhost:${PORT}`));
