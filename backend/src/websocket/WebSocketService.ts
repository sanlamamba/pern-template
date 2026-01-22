import type { Server } from 'http';
import { WebSocketServer, WebSocket } from 'ws';

interface Client extends WebSocket {
  isAlive: boolean;
}

export class WebSocketService {
  private wss: WebSocketServer | null = null;

  constructor(private server: Server) {}

  initialize() {
    this.wss = new WebSocketServer({ server: this.server, path: '/ws' });

    this.wss.on('connection', (ws: Client) => {
      ws.isAlive = true;
      ws.on('pong', () => (ws.isAlive = true));
      ws.on('message', (data) => this.onMessage(ws, data.toString()));
    });

    // Heartbeat
    setInterval(() => {
      this.wss?.clients.forEach((ws) => {
        const client = ws as Client;
        if (!client.isAlive) return client.terminate();
        client.isAlive = false;
        client.ping();
      });
    }, 30000);
  }

  private onMessage(ws: WebSocket, data: string) {
    try {
      const msg = JSON.parse(data);
      if (msg.type === 'ping') ws.send(JSON.stringify({ type: 'pong' }));
    } catch {
    }
  }

  broadcast(data: object) {
    const msg = JSON.stringify(data);
    this.wss?.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) client.send(msg);
    });
  }
}
