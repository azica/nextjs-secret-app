const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 3001 });

wss.on("connection", (ws) => {
	console.log("New client connected");

	ws.on("message", (message) => {
		console.log(`Received message: ${message}`);
		setInterval(() => {
			ws.send(message);
		}, 5000);
	});

	ws.on("close", () => {
		console.log("Client disconnected");
	});
});

console.log("WebSocket server running on ws://localhost:3001");
