🚀 CODEXCLOUDBRIDGE DEPLOY INSTRUCTIONS (Render)

1. Go to https://render.com and log in
2. Click "New +" → "Web Service"
3. Connect your Git repo or upload manually (drag CodexCloudBridge folder)
4. Set:
   - Runtime: Node
   - Build Command: npm install
   - Start Command: npm start
   - Root Directory: (this folder)
5. Deploy!

➡ Endpoint will look like: https://your-service.onrender.com/sse
➡ LexorPC (ReflexChannel.js) should connect to this SSE stream

🌐 Live commands will stream from cloud into LexorPC bridge_input.json