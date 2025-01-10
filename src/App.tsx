import React, { useEffect, useState, useCallback } from 'react';
import { GameState, Position, Player } from './types';
import { checkWinner, movePosition, positionToIndex } from './utils';
import Board from './components/Board';
import { GamepadIcon } from 'lucide-react';
import { useWebSocket } from './hooks/useWebSocket';

function App() {
  const [roomId, setRoomId] = useState<string>('');
  const [playerId, setPlayerId] = useState<Player | null>(null);
  const [gameState, setGameState] = useState<GameState>({
    board: Array(9).fill(null),
    currentPlayer: 'X',
    selectedPosition: { row: 0, col: 0 },
    winner: null
  });

  const handleMessage = useCallback((data: any) => {
    switch (data.type) {
      case 'joined':
        setPlayerId(data.playerId);
        setGameState(data.gameState);
        break;
      case 'gameStart':
      case 'gameUpdate':
        setGameState(data.gameState);
        break;
      case 'playerLeft':
        alert(`Player ${data.playerId} has left the game`);
        break;
    }
  }, []);

  const { sendMessage } = useWebSocket('ws://localhost:8080', handleMessage);

  const joinRoom = () => {
    const newRoomId = prompt('Enter room ID:');
    if (newRoomId) {
      setRoomId(newRoomId);
      sendMessage({ type: 'join', roomId: newRoomId });
    }
  };

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!playerId || gameState.winner || gameState.currentPlayer !== playerId) return;

    let newPosition = { ...gameState.selectedPosition };
    let shouldUpdate = false;

    switch (event.key) {
      case 'ArrowUp':
        newPosition = movePosition(gameState.selectedPosition, 'up');
        shouldUpdate = true;
        break;
      case 'ArrowDown':
        newPosition = movePosition(gameState.selectedPosition, 'down');
        shouldUpdate = true;
        break;
      case 'ArrowLeft':
        newPosition = movePosition(gameState.selectedPosition, 'left');
        shouldUpdate = true;
        break;
      case 'ArrowRight':
        newPosition = movePosition(gameState.selectedPosition, 'right');
        shouldUpdate = true;
        break;
      case 'Enter':
        const index = positionToIndex(gameState.selectedPosition);
        if (gameState.board[index] === null) {
          const newBoard = [...gameState.board];
          newBoard[index] = gameState.currentPlayer;
          
          const winner = checkWinner(newBoard);
          const newGameState = {
            board: newBoard,
            currentPlayer: gameState.currentPlayer === 'X' ? 'O' : 'X',
            selectedPosition: gameState.selectedPosition,
            winner
          };
          
          setGameState(newGameState);
          sendMessage({ type: 'move', gameState: newGameState });
        }
        return;
    }

    if (shouldUpdate) {
      const newGameState = {
        ...gameState,
        selectedPosition: newPosition
      };
      setGameState(newGameState);
      sendMessage({ type: 'move', gameState: newGameState });
    }
  }, [gameState, playerId, sendMessage]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const resetGame = () => {
    const newGameState = {
      board: Array(9).fill(null),
      currentPlayer: 'X',
      selectedPosition: { row: 0, col: 0 },
      winner: null
    };
    setGameState(newGameState);
    sendMessage({ type: 'move', gameState: newGameState });
  };

  const getGameStatus = () => {
    if (!roomId) return 'Click Join Room to start playing';
    if (!playerId) return 'Waiting for opponent...';
    if (gameState.winner === 'draw') return 'Game Over - It\'s a Draw!';
    if (gameState.winner) return `Player ${gameState.winner} Wins!`;
    return gameState.currentPlayer === playerId ? 'Your Turn' : 'Opponent\'s Turn';
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-white mb-2 flex items-center justify-center gap-2">
          <GamepadIcon className="w-8 h-8" />
          Multiplayer Tic-Tac-Toe
        </h1>
        <p className="text-xl text-gray-300 mb-4">Use arrow keys to move, Enter to select</p>
      </div>

      {!roomId ? (
        <button
          onClick={joinRoom}
          className="mb-8 py-2 px-6 bg-blue-500 text-white rounded-lg
                   hover:bg-blue-600 transition-colors font-semibold"
        >
          Join Room
        </button>
      ) : (
        <div className="bg-gray-800/50 p-8 rounded-xl shadow-2xl">
          <div className="mb-6 text-center">
            <p className="text-sm text-gray-400 mb-2">Room ID: {roomId}</p>
            <p className="text-sm text-gray-400 mb-2">You are Player: {playerId || '...'}</p>
            <p className={`text-2xl font-semibold mb-2 ${
              gameState.winner 
                ? 'text-green-400' 
                : gameState.currentPlayer === playerId 
                  ? 'text-blue-400' 
                  : 'text-red-400'
            }`}>
              {getGameStatus()}
            </p>
          </div>

          <Board
            board={gameState.board}
            selectedPosition={gameState.selectedPosition}
            onCellClick={() => {}} // Keyboard only navigation
          />

          {gameState.winner && (
            <button
              onClick={resetGame}
              className="mt-6 w-full py-2 px-4 bg-green-500 text-white rounded-lg
                       hover:bg-green-600 transition-colors font-semibold"
            >
              Play Again
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default App;