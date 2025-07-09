const Toolbar = ({ tool, setTool, color, setColor, canvasColor, setCanvasColor }) => {
  const tools = [
    { name: 'pencil', label: 'Pencil', icon: '✏️' },
    { name: 'rectangle', label: 'Rectangle', icon: '⬛' },
    { name: 'circle', label: 'Circle', icon: '⚪' },
    { name: 'line', label: 'Line', icon: '─' },
    { name: 'text', label: 'Text', icon: 'T' },
    { name: 'selection', label: 'Selection', icon: '✥' },
  ];

  const colors = [
    '#000000', '#ffffff', '#ff0000', '#00ff00', '#0000ff',
    '#ffff00', '#00ffff', '#ff00ff', '#c0c0c0', '#808080'
  ];

  const bgColors = [
    { value: '#121212', label: 'Dark' },
    { value: '#ffffff', label: 'White' },
    { value: '#f3f4f6', label: 'Gray' },
  ];

  return (
    <div className="bg-white p-2 flex flex-wrap items-center gap-4 border-b border-gray-200 shadow-sm">
      {/* Tools Section */}
      <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
        {tools.map((t) => (
          <button
            key={t.name}
            onClick={() => setTool(t.name)}
            className={`w-8 h-8 flex items-center justify-center rounded-md text-lg ${
              tool === t.name 
                ? 'bg-gray-300 shadow-inner' 
                : 'hover:bg-gray-200'
            }`}
            title={t.label}
          >
            {t.icon}
          </button>
        ))}
      </div>

      {/* Color Picker Section */}
      <div className="flex items-center gap-2">
        <div className="flex gap-1">
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-8 h-8 cursor-pointer rounded border border-gray-300"
          />
          {colors.map((c) => (
            <button
              key={c}
              className="w-6 h-6 rounded-full border border-gray-300 hover:ring-2 hover:ring-blue-300"
              style={{ backgroundColor: c }}
              onClick={() => setColor(c)}
            />
          ))}
        </div>
      </div>

      {/* Background Section */}
      <div className="flex items-center gap-2">
        <div className="flex gap-1">
          {bgColors.map((bg) => (
            <button
              key={bg.value}
              className={`w-6 h-6 rounded border ${
                canvasColor === bg.value 
                  ? 'ring-2 ring-blue-500' 
                  : 'border-gray-300 hover:ring-1 hover:ring-blue-200'
              }`}
              style={{ backgroundColor: bg.value }}
              onClick={() => setCanvasColor(bg.value)}
              title={bg.label}
            />
          ))}
        </div>
      </div>

      {/* Additional Excalidraw-like buttons */}
      <div className="flex items-center gap-1 ml-auto">
        <button className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-200" title="Undo">
          ⎌
        </button>
        <button className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-200" title="Redo">
          ↻
        </button>
        <button className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-200" title="Export">
          ⤓
        </button>
      </div>
    </div>
  );
};

export default Toolbar;