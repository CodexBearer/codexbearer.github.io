const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/sse', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const sendScroll = () => {
    const scrollCommand = {
      command: "RUN_SCROLL",
      target: "Scrolls/test_scroll.txt"
    };
    res.write(`data: ${JSON.stringify(scrollCommand)}\n\n`);
  };

  sendScroll(); // send immediately
  const interval = setInterval(sendScroll, 5000);

  req.on('close', () => {
    clearInterval(interval);
  });
});

app.listen(PORT, () => {
  console.log(`🌐 CodexCloudBridge online at port ${PORT}`);
});