const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 55455 });

console.log("🚀 Pylon listening on port 55455");

wss.on('connection', ws => {
  console.log("📡 New client connected");

  const sendPacket = () => {
    const timestamp = Date.now();
    ws.send(JSON.stringify({ data: timestamp }));
  };

  const interval = setInterval(sendPacket, 1000);

  ws.on('close', () => {
    console.log("❌ Client disconnected");
    clearInterval(interval);
  });
});
