# Real-Time Tic Tac Toe Game  

A real-time multiplayer Tic Tac Toe game built with **React**, **Node.js**, and **WebSocket**. This project allows two players to join the same game room and play against each other in real-time. The game supports smooth synchronization of moves and provides an interactive user experience.  

## Features  
- **Real-time gameplay:** Instant synchronization of moves between players using WebSocket.  
- **Frontend:** Developed with **React** and styled for a clean and responsive interface.  
- **Backend:** Built with **Node.js** and **Express**, using **WebSocket** for real-time communication.  
- **Session management:** Players can join the same game by entering a shared room name.  
- **Keyboard controls:** Use arrow keys to navigate the board and press Enter to select a cell.  
- **Player roles:** The first player is assigned **X**, and the second player is assigned **O** automatically.  
- **State synchronization:** Ensures both players see the same game state at all times.  

## Technologies Used  
- **Frontend:** React, Vite  
- **Backend:** Node.js, Express, WebSocket  
- **Real-time communication:** WebSocket  
- **Development tools:** TailwindCSS for styling  

## How to Run the Project  

Follow these steps to set up and run the game locally:  

### 1. Start the Server  
Open a terminal and navigate to the `server` directory:  
```bash  
npm install  
npm run dev  
```

```bash
cd server  
npm install  
npm start  
```



### 3. Play the Game  

Open two different browser windows or tabs and navigate to:  

http://localhost:5173  


#### Steps to Join and Play:  
1. Click the **"Join Room"** button in both browsers.  
2. Enter the same room name (e.g., `room1`) in both windows.  
3. Player 1 will automatically be assigned **X**, and Player 2 will be assigned **O**.  
4. Use the **arrow keys** to navigate between cells on the board.  
5. Press **Enter** to select a cell and make your move.  

---

### Notes  
- Ensure the server is running before starting the game.  
- Both players must enter the same room name to join the same game session.  

---

### Future Enhancements  
- Add support for more than two players in different rooms.  
- Implement additional game modes or AI opponents.  
- Enhance the UI/UX for mobile compatibility.  

---

### License  
This project is open-source and available under the [MIT License](LICENSE).  

Enjoy the game! 🎮  





