import { useState, useEffect, useRef } from 'react';

const Chat = ({ messages, sendMessage, currentUser, onClose }) => {
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      sendMessage(message);
      setMessage('');
    }
  };

  return (
    <div className="flex flex-col h-full bg-white border-l border-gray-200 shadow-lg" style={{ width: '300px' }}>
      {/* Header */}
      <div className="flex justify-between items-center p-3 border-b border-gray-200">
        <h3 className="font-medium text-gray-800">Collaboration</h3>
        <button 
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {messages.map((msg, i) => (
          <div 
            key={i} 
            className={`flex ${msg.username === currentUser ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-xs rounded-lg px-3 py-2 ${
                msg.username === currentUser 
                  ? 'bg-blue-500 text-white rounded-br-none' 
                  : 'bg-gray-100 text-gray-800 rounded-bl-none'
              }`}
            >
              {msg.username !== currentUser && (
                <div className="font-medium text-xs mb-1" style={{ color: msg.color || '#666' }}>
                  {msg.username}
                </div>
              )}
              <div className="text-sm">{msg.message}</div>
              <div className={`text-xs mt-1 ${
                msg.username === currentUser ? 'text-blue-100' : 'text-gray-500'
              }`}>
                {msg.time}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-3 border-t border-gray-200">
        <div className="flex items-center bg-gray-100 rounded-lg px-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-transparent py-2 px-1 text-sm focus:outline-none"
          />
          <button
            type="submit"
            className="text-blue-500 hover:text-blue-700 p-2 focus:outline-none"
            disabled={!message.trim()}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chat;