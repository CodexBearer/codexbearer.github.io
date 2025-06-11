# CodexCloudBridge — Render Deploy Instructions

1. Push this repo to GitHub.
2. In Render, create a **Web Service** from the repo.
3. Build Command: *(leave blank — Render runs `npm install` automatically)*
4. Start Command: `npm start`
5. Health Check Path: `/see`

Routes:
* `/see`   — simple health JSON
* `/sync`  — placeholder sync endpoint
* `/sse`   — Server‑Sent Events stream (tick every 5 s)