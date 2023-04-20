const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 });
console.log("http:localhost:8080");
wss.on("connection", function connection(ws) {
  console.log("Client connected");

  ws.on("message", function incoming(message) {
    console.log("Received message:", message);
    const messageString = message.toString();

    // Broadcast message to all clients
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(messageString);
      }
    });
  });

  ws.on("close", function close() {
    console.log("Client disconnected");
  });
});
