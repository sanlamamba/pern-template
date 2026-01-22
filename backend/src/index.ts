import 'dotenv/config';
import { createServer } from 'http';
import { app } from './app.js';
import { WebSocketService } from './websocket/WebSocketService.js';

const PORT = process.env.PORT || 3001;
const server = createServer(app);

// WebSocket
new WebSocketService(server).initialize();

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Graceful shutdown
const shutdown = () => {
  server.close(() => process.exit(0));
};
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
