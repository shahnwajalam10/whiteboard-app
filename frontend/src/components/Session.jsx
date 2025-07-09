const Session = ({ roomId, username }) => {
  return (
    <div className="p-3 border-b border-gray-200 bg-white">
      <div className="flex justify-between items-center mb-2">
        <h2 className="font-medium text-gray-800 text-sm">SESSION</h2>
        <button className="text-gray-500 hover:text-gray-700">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
      
      <div className="space-y-2 text-sm">
        <div className="flex items-center justify-between py-1 px-2 bg-gray-50 rounded">
          <span className="text-gray-600">Room:</span>
          <div className="flex items-center">
            <span className="font-mono text-gray-800 mr-2">{roomId}</span>
            <button className="text-gray-500 hover:text-blue-500">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              </svg>
            </button>
          </div>
        </div>
        
        <div className="flex items-center justify-between py-1 px-2 bg-gray-50 rounded">
          <span className="text-gray-600">User:</span>
          <div className="flex items-center">
            <div 
              className="w-3 h-3 rounded-full mr-2" 
              style={{ backgroundColor: '#3b82f6' }} // Excalidraw-style user color
            />
            <span className="font-medium text-gray-800">{username}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Session;