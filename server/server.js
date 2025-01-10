import express from 'express';
import { WebSocketServer } from 'ws';
import { createServer } from 'http';
import cors from 'cors';

const app = express();
app.use(cors());
const server = createServer(app);
const wss = new WebSocketServer({ server });

const rooms = new Map();
const clients = new Map();

const PORT = 8080; 

wss.on('connection', (ws) => {
  let roomId = null;
  let playerId = null;

  ws.on('message', (message) => {
    const data = JSON.parse(message);

    switch (data.type) {
      case 'join':
        roomId = data.roomId;
        if (!rooms.has(roomId)) {
          rooms.set(roomId, {
            players: new Map(),
            gameState: {
              board: Array(9).fill(null),
              currentPlayer: 'X',
              selectedPosition: { row: 0, col: 0 },
              winner: null
            }
          });
        }

        const room = rooms.get(roomId);
        if (room.players.size < 2) {
          playerId = room.players.size === 0 ? 'X' : 'O';
          room.players.set(playerId, ws);
          clients.set(ws, { roomId, playerId });

          ws.send(JSON.stringify({
            type: 'joined',
            playerId,
            gameState: room.gameState
          }));

          if (room.players.size === 2) {
            room.players.forEach((playerWs) => {
              playerWs.send(JSON.stringify({
                type: 'gameStart',
                gameState: room.gameState
              }));
            });
          }
        } else {
          ws.send(JSON.stringify({
            type: 'error',
            message: 'Room is full'
          }));
        }
        break;

      case 'move':
        if (roomId && rooms.has(roomId)) {
          const room = rooms.get(roomId);
          room.gameState = data.gameState;
          
          room.players.forEach((playerWs) => {
            if (playerWs !== ws) {
              playerWs.send(JSON.stringify({
                type: 'gameUpdate',
                gameState: room.gameState
              }));
            }
          });
        }
        break;
    }
  });

  ws.on('close', () => {
    if (roomId && rooms.has(roomId)) {
      const room = rooms.get(roomId);
      room.players.delete(playerId);
      
      if (room.players.size === 0) {
        rooms.delete(roomId);
      } else {
        room.players.forEach((playerWs) => {
          playerWs.send(JSON.stringify({
            type: 'playerLeft',
            playerId
          }));
        });
      }
    }
    clients.delete(ws);
  });
});


server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});