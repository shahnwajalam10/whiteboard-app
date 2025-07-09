import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import Toolbar from './components/Toolbar';
import Chat from './components/Chat';
import Session from './components/Session';
import useCanvas from './hooks/useCanvas';


const socket = io(import.meta.env.VITE_SOCKET_URL, {
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

function App() {
  const [roomId, setRoomId] = useState('');
  const [username, setUsername] = useState('');
  const [joined, setJoined] = useState(false);
  const [messages, setMessages] = useState([]);
  const [canvasColor, setCanvasColor] = useState('#121212');
  const [tool, setTool] = useState('pencil');
  const [color, setColor] = useState('#000000');
  const [connectionStatus, setConnectionStatus] = useState('disconnected');

  useCanvas(tool, color, canvasColor);

  useEffect(() => {
    socket.on('connect', () => {
      setConnectionStatus('connected');
    });

    socket.on('disconnect', () => {
      setConnectionStatus('disconnected');
    });

    socket.on('connect_error', (err) => {
      setConnectionStatus('error');
    });

    socket.on('getMessage', (data) => {
      setMessages(prev => [...prev, data]);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('connect_error');
      socket.off('getMessage');
    };
  }, []);

  const joinRoom = () => {
    if (roomId.trim() && username.trim()) {
      socket.emit('joinRoom', { roomId });
      setJoined(true);
    } else {
      alert('Please enter both username and room ID');
    }
  };

  const sendMessage = (message) => {
    if (message.trim()) {
      socket.emit('sendMessage', {
        roomId,
        username,
        message,
        time: new Date().toLocaleTimeString()
      });
    }
  };

  if (!joined) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <h1 className="text-2xl font-bold mb-6 text-center">Join Room</h1>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black-500"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Room ID</label>
              <input
                type="text"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black-500"
                placeholder="Enter room ID"
              />
            </div>
            <button
              onClick={joinRoom}
              className="w-full bg-black text-white py-2 rounded-md hover:bg-white hover:text-black border border-black transition duration-200"
            >
              Join
            </button>
            <div className="text-center text-sm text-gray-500">
              Connection: <span className={`font-medium ${
                connectionStatus === 'connected' ? 'text-green-500' : 
                connectionStatus === 'error' ? 'text-red-500' : 'text-yellow-500'
              }`}>
                {connectionStatus}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="bg-black text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Whiteboard - Room: {roomId}</h1>
        <div className="text-sm">
          Status: <span className={`${
            connectionStatus === 'connected' ? 'text-green-400' : 
            connectionStatus === 'error' ? 'text-red-400' : 'text-yellow-400'
          }`}>
            {connectionStatus}
          </span>
        </div>
      </div>
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 flex flex-col">
          <Toolbar
            tool={tool}
            setTool={setTool}
            color={color}
            setColor={setColor}
            canvasColor={canvasColor}
            setCanvasColor={setCanvasColor}
          />
          <div className="flex-1 relative">
            <canvas
              id="drawingCanvas"
              className="absolute top-0 left-0 w-full h-full bg-white"
            />
          </div>
        </div>
        <div className="w-80 border-l border-gray-300 flex flex-col bg-white">
          <Session roomId={roomId} username={username} />
          <Chat messages={messages} sendMessage={sendMessage} />
        </div>
      </div>
    </div>
  );
}

export default App;