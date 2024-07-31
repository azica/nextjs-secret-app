const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 3001 });

wss.on("connection", (ws) => {
	console.log("New client connected");

	let message = "";

	ws.on("message", (receivedMessage) => {
		console.log(`Received message: ${receivedMessage}`);
		message = receivedMessage; // Сохраняем последний полученный ключ

		// Создаем интервал для отправки сообщения каждые 5 секунд
		if (!ws.intervalId) {
			ws.intervalId = setInterval(() => {
				if (ws.readyState === WebSocket.OPEN) {
					console.log(`Sending message: ${message}`);
					ws.send(message);
				} else {
					console.log("WebSocket not open, skipping send");
				}
			}, 5000);
		}
	});

	ws.on("close", () => {
		console.log("Client disconnected");
		if (ws.intervalId) {
			clearInterval(ws.intervalId); // Очищаем интервал при отключении клиента
		}
	});
});

console.log("WebSocket server running on ws://localhost:3001");
