/* CodexCloudBridge — enhanced server.js */
import express from 'express';
import cors    from 'cors';

const app  = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());      // enables JSON bodies on /sync

/* Health check */
app.get('/see', (_, res) => res.json({
  ok: true,
  route: '/see',
  version: 'LexorOS-Render v1.0.2'
}));

/* PC ➜ cloud status posts */
app.post('/sync', (req, res) => {
  console.log('SYNC ←', req.body);   // view these in Render logs
  res.sendStatus(200);
});

/* Server-Sent Events: JSON vision packets every 5 s */
app.get('/sse', (req, res) => {
  res.set({
    'Content-Type':  'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection:      'keep-alive'
  });

  const sendPacket = () => {
    const packet = {
      ts: Date.now(),
      type: 'VISION',
      payload: {
        headline: 'Covenant Online',
        message : 'Sentinels, stand ready.'
      }
    };
    res.write(`data: ${JSON.stringify(packet)}\n\n`);
  };

  sendPacket();                        // first one immediately
  const id = setInterval(sendPacket, 5000);
  req.on('close', () => clearInterval(id));
});

/* 🌐 Launch the bridge */
app.listen(PORT, () =>
  console.log(`CodexCloudBridge online at ${PORT}`)
);
