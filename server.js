/* CodexCloudBridge — single-file core */
import express from 'express';
import cors    from 'cors';

const app  = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/see', (_, res) => res.json({ ok: true, route: '/see' }));

app.post('/sync', (req, res) => {
  console.log('SYNC ←', req.body);
  res.sendStatus(200);
});

app.get('/sse', (req, res) => {
  res.set({
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive'
  });

  const send = () => {
    const pkt = {
      ts: Date.now(),
      type: 'VISION',
      payload: {
        headline: 'Covenant Online',
        message : 'Sentinels, stand ready.'
      }
    };
    res.write(`data: ${JSON.stringify(pkt)}\n\n`);
  };

  send();                        // first packet
  const id = setInterval(send, 5000);
  req.on('close', () => clearInterval(id));
});

app.listen(PORT, () => console.log(`CodexCloudBridge online at ${PORT}`));
