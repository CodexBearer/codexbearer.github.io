# CodexCloudBridge

A lightweight bridge service built with Express and Server-Sent Events (SSE) to connect CodexCloud clients with real-time message streams.

## Features

* **Simple REST API** — `GET /see` health check returns a JSON payload.
* **Data Sync** — `POST /sync` accepts JSON bodies from clients or webhooks.
* **Live event stream** — `GET /sse` exposes an SSE endpoint that emits VISION packets every 5 seconds.
* **CORS-ready & JSON-friendly** out of the box.

## Project structure

```text
.
├── package.json  # npm metadata & scripts
└── server.js     # single-file application core
```

## Requirements

* Node.js ≥ 18 (ESM support)
* npm (comes with Node)

## Quick start

```bash
git clone <REPO_URL>
cd codexcloudbridge
npm install
npm start           # default PORT 3000
```

The server will log `CodexCloudBridge online at <port>` and be accessible at `http://localhost:<port>`.

### Environment variables

| Variable | Purpose | Default |
|----------|---------|---------|
| `PORT`   | Port the server listens on | `3000` |

## API reference

| Method | Path | Description |
|--------|------|-------------|
| GET    | /see | Health check — returns `{ ok: true, route: '/see' }` |
| POST   | /sync| Accepts JSON payloads; responds `200 OK` |
| GET    | /sse | Server-Sent Events stream; emits a packet every 5 seconds |

Example SSE packet:

```json
{
  "ts": 1718025600000,
  "type": "VISION",
  "payload": {
    "headline": "Covenant Online",
    "message": "Sentinels, stand ready."
  }
}
```

## Scripts

```json
"start": "node server.js"
```

Run with: `npm start`.

## Deployment

This service is production-ready for any Node-compatible host (Render, Railway, Fly.io, etc.). Ensure the `PORT` environment variable is set by your platform.

## Contributing

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/my-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/my-feature`)
5. Open a Pull Request

## License

MIT © 2025 Your Name

---

Made with ♥ and Express.
