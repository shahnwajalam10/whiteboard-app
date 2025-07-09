import { useEffect, useRef } from 'react';

const useCanvas = (tool, color, canvasColor, roomId, username) => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const lastSentRef = useRef(0);
  const pendingUpdatesRef = useRef([]);
  const connectionTypeRef = useRef('4g');

  // Initialize canvas and set up drawing
  useEffect(() => {
    const canvas = document.getElementById('drawingCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    ctxRef.current = ctx;

    // Set up network awareness
    if ('connection' in navigator) {
      connectionTypeRef.current = navigator.connection.effectiveType;
      navigator.connection.addEventListener('change', updateNetworkStatus);
    }

    // Set up geolocation
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          socket.emit('userLocation', {
            roomId,
            username,
            location: {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            }
          });
        },
        (error) => console.log('Geolocation error:', error),
        { enableHighAccuracy: true }
      );
    }

    // Initialize canvas
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      redrawCanvas();
    };

    const redrawCanvas = () => {
      ctx.fillStyle = canvasColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Set up intersection observer for lazy loading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Load canvas section if needed
          }
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(canvas);

    // Drawing logic with adaptive quality
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    const startDrawing = (e) => {
      isDrawing = true;
      [lastX, lastY] = [getCoordinates(e)];
    };

    const draw = (e) => {
      if (!isDrawing) return;
      
      const [x, y] = getCoordinates(e);
      const now = Date.now();
      
      // Adjust quality based on network
      const lineWidth = connectionTypeRef.current === 'slow-2g' ? 3 : 5;
      const shouldSend = now - lastSentRef.current > getNetworkThrottle();

      ctx.strokeStyle = color;
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      ctx.lineWidth = lineWidth;

      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(x, y);
      ctx.stroke();

      if (shouldSend) {
        sendDrawingUpdate(lastX, lastY, x, y);
        lastSentRef.current = now;
      } else {
        pendingUpdatesRef.current.push({ lastX, lastY, x, y });
      }

      [lastX, lastY] = [x, y];
    };

    const stopDrawing = () => {
      isDrawing = false;
      flushPendingUpdates();
    };

    // Event listeners
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);

    // Touch support
    canvas.addEventListener('touchstart', handleTouch);
    canvas.addEventListener('touchmove', handleTouch);
    canvas.addEventListener('touchend', stopDrawing);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if ('connection' in navigator) {
        navigator.connection.removeEventListener('change', updateNetworkStatus);
      }
      observer.disconnect();
      // Clean up event listeners...
    };
  }, [tool, color, canvasColor]);

  // Helper functions
  const getCoordinates = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    return [x, y];
  };

  const handleTouch = (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent(
      e.type === 'touchstart' ? 'mousedown' : 'mousemove',
      {
        clientX: touch.clientX,
        clientY: touch.clientY
      }
    );
    e.target.dispatchEvent(mouseEvent);
  };

  const updateNetworkStatus = () => {
    connectionTypeRef.current = navigator.connection.effectiveType;
  };

  const getNetworkThrottle = () => {
    switch(connectionTypeRef.current) {
      case 'slow-2g': return 500; // ms
      case '2g': return 300;
      case '3g': return 200;
      case '4g': return 100;
      default: return 150;
    }
  };

  const sendDrawingUpdate = (x1, y1, x2, y2) => {
    // Use Background Tasks API if available
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(() => {
        socket.emit('drawing', {
          roomId,
          x1, y1, x2, y2,
          color,
          tool,
          timestamp: Date.now()
        });
      });
    } else {
      socket.emit('drawing', {
        roomId,
        x1, y1, x2, y2,
        color,
        tool,
        timestamp: Date.now()
      });
    }
  };

  const flushPendingUpdates = () => {
    if (pendingUpdatesRef.current.length > 0) {
      socket.emit('bulkDrawing', {
        roomId,
        updates: pendingUpdatesRef.current,
        color,
        tool
      });
      pendingUpdatesRef.current = [];
    }
  };
};

export default useCanvas;