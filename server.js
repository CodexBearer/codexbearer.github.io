import express from 'express';
import cors    from 'cors';

const app  = express();
const PORT = process.env.PORT || 3000;
app.use(cors());

// Diagnostic routes
app.get('/see',  (_, res) => res.json({ ok: true, route: '/see'  }));
app.get('/sync', (_, res) => res.json({ ok: true, route: '/sync' }));

// Server‑Sent Events stream
app.get('/sse', (req, res) => {
  res.set({
    'Content-Type':  'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection:      'keep-alive'
  });

  const tick = () => res.write(`data: ${Date.now()}\n\n`);
  tick();
  const id = setInterval(tick, 5000);
  req.on('close', () => clearInterval(id));
});

app.listen(PORT, () => console.log(`CodexCloudBridge online at ${PORT}`));