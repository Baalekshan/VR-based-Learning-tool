import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface ColorOption {
  name: string;
  value: string;
}

interface ColoringImage {
  id: number;
  outlineSrc: string;
  title: string;
}

const colorOptions: ColorOption[] = [
  { name: 'Red', value: '#FF0000' },
  { name: 'Blue', value: '#0000FF' },
  { name: 'Green', value: '#00FF00' },
  { name: 'Yellow', value: '#FFFF00' },
  { name: 'Purple', value: '#800080' },
  { name: 'Orange', value: '#FFA500' },
  { name: 'Black', value: '#000000' },
  { name: 'White', value: '#FFFFFF' },
];

// Sample coloring images - replace with your actual image paths
const coloringImages: ColoringImage[] = [
  {
    id: 1,
    outlineSrc: '/assets/coloring/30708730_7728706.svg',
    title: 'Image 1'
  },
  {
    id: 2,
    outlineSrc: '/assets/coloring/36630277_8437994.svg',
    title: 'Image 2'
  },
  {
    id: 3,
    outlineSrc: '/assets/coloring/32352988_7937671.svg',
    title: 'Image 3'
  },
  {
    id: 4,
    outlineSrc: '/assets/coloring/31712370_7855446.svg',
    title: 'Image 4'
  }
];

const ColoringActivity: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentColor, setCurrentColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(5);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [outlineImage, setOutlineImage] = useState<HTMLImageElement | null>(null);
  const [canvasStates, setCanvasStates] = useState<ImageData[]>([]);
  const [isFillMode, setIsFillMode] = useState(false);
  const [canvasState, setCanvasState] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Load the current outline image
  useEffect(() => {
    const loadImages = () => {
      try {
        setIsLoading(true);
        setError(null);
        const currentImage = coloringImages[currentImageIndex];
        console.log('Loading image:', currentImage.outlineSrc);
        
        const outlineImg = new Image();
        outlineImg.src = currentImage.outlineSrc;
        outlineImg.onload = () => {
          console.log('Image loaded successfully');
          setOutlineImage(outlineImg);
          drawOutlineImage(outlineImg);
          setIsLoading(false);
        };
        outlineImg.onerror = (error) => {
          console.error('Error loading image:', error);
          setError('Failed to load the coloring image. Please try refreshing the page.');
          setIsLoading(false);
        };
      } catch (error) {
        console.error('Error in loadImages:', error);
        setError('An error occurred while loading the coloring activity.');
        setIsLoading(false);
      }
    };
    
    loadImages();
  }, [currentImageIndex]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.error('Canvas element not found');
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error('Could not get 2D context');
      return;
    }

    // Set canvas size to match window size
    const resizeCanvas = () => {
      try {
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();
        
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        
        ctx.scale(dpr, dpr);
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Redraw the outline image after resize
        if (outlineImage) {
          drawOutlineImage(outlineImage);
        }
      } catch (error) {
        console.error('Error in resizeCanvas:', error);
      }
    };

    // Initial resize
    resizeCanvas();

    // Add resize listener
    window.addEventListener('resize', resizeCanvas);

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [outlineImage]);

  useEffect(() => {
    const loadSavedState = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const savedState = localStorage.getItem('coloringState');
      if (savedState) {
        const imageData = new ImageData(new Uint8ClampedArray(JSON.parse(savedState)), canvas.width, canvas.height);
        ctx.putImageData(imageData, 0, 0);
      }
    };

    loadSavedState();
  }, []);

  const drawOutlineImage = (img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear the canvas
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Calculate dimensions to fit the image in the center of the canvas
    const canvasWidth = canvas.width / window.devicePixelRatio;
    const canvasHeight = canvas.height / window.devicePixelRatio;
    
    // Calculate scaling to fit the image while maintaining aspect ratio
    const scale = Math.min(
      canvasWidth / img.width,
      canvasHeight / img.height
    ) * 0.8; // 80% of the canvas size
    
    const width = img.width * scale;
    const height = img.height * scale;
    
    // Center the image
    const x = (canvasWidth - width) / 2;
    const y = (canvasHeight - height) / 2;
    
    // Draw the image
    ctx.drawImage(img, x, y, width, height);
  };

  const getCoordinates = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  };

  const saveCanvasState = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setCanvasStates((prev) => {
      const newStates = [...prev, imageData];
      return newStates.slice(-10); // Limit to 10 states
    });
  };

  const undo = () => {
    if (canvasStates.length === 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const imageData = canvasStates[canvasStates.length - 1];
    ctx.putImageData(imageData, 0, 0);
    setCanvasStates((prev) => prev.slice(0, -1));
  };

  const handleErase = () => {
    setCurrentColor('#FFFFFF'); // Set color to white for erasing
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCoordinates(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
    saveCanvasState(); // Save state before drawing
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCoordinates(e);
    ctx.lineTo(x, y);
    ctx.strokeStyle = currentColor;
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    saveProgressToMongoDB(canvasState);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Redraw the outline image
    if (outlineImage) {
      drawOutlineImage(outlineImage);
    }
  };

  const handleHome = () => {
    navigate('/selectionpage');
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % coloringImages.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + coloringImages.length) % coloringImages.length);
  };

  const floodFill = (ctx: CanvasRenderingContext2D, x: number, y: number, fillColor: string) => {
    const canvasWidth = ctx.canvas.width;
    const canvasHeight = ctx.canvas.height;
    const imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
    const data = imageData.data;

    const targetColor = getColorAtPixel(data, x, y, canvasWidth);
    const fillColorArray = hexToRgb(fillColor);

    if (colorsMatch(targetColor, fillColorArray)) return;

    const stack = [[x, y]];
    const visited = new Set();

    while (stack.length) {
      const [currentX, currentY] = stack.pop()!;
      const currentPos = (currentY * canvasWidth + currentX) * 4;

      if (visited.has(`${currentX},${currentY}`)) continue;
      visited.add(`${currentX},${currentY}`);

      if (!colorsMatch(getColorAtPixel(data, currentX, currentY, canvasWidth), targetColor)) continue;

      setColorAtPixel(data, currentPos, fillColorArray);

      if (currentX + 1 < canvasWidth) stack.push([currentX + 1, currentY]);
      if (currentX - 1 >= 0) stack.push([currentX - 1, currentY]);
      if (currentY + 1 < canvasHeight) stack.push([currentX, currentY + 1]);
      if (currentY - 1 >= 0) stack.push([currentX, currentY - 1]);
    }

    ctx.putImageData(imageData, 0, 0);
  };

  const getColorAtPixel = (data: Uint8ClampedArray, x: number, y: number, width: number) => {
    const pos = (y * width + x) * 4;
    return [data[pos], data[pos + 1], data[pos + 2], data[pos + 3]];
  };

  const setColorAtPixel = (data: Uint8ClampedArray, pos: number, color: number[]) => {
    data[pos] = color[0];
    data[pos + 1] = color[1];
    data[pos + 2] = color[2];
    data[pos + 3] = 255;
  };

  const colorsMatch = (a: number[], b: number[]) => {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
  };

  const hexToRgb = (hex: string) => {
    const bigint = parseInt(hex.slice(1), 16);
    return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
  };

  const handleFill = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCoordinates(e);
    floodFill(ctx, Math.floor(x), Math.floor(y), currentColor);
  };

  const toggleMode = () => {
    setIsFillMode(!isFillMode);
  };

  const saveStateToLocalStorage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    localStorage.setItem('coloringState', JSON.stringify(Array.from(imageData.data)));
  };

  // Function to save progress to MongoDB
  const saveProgressToMongoDB = async (canvasState: string) => {
    try {
      await axios.post('/api/save-progress', { imageId: 'current-image-id', canvasState });
    } catch (error) {
      console.error('Error saving progress to MongoDB:', error);
    }
  };

  // Function to load progress from MongoDB
  const loadProgressFromMongoDB = async () => {
    try {
      const response = await axios.get('/api/get-progress', { params: { imageId: 'current-image-id' } });
      const { progress } = response.data as { progress: { canvasState: string } };
      if (progress) {
        setCanvasState(progress.canvasState);
      }
    } catch (error) {
      console.error('Error loading progress from MongoDB:', error);
    }
  };

  // Load progress when component mounts
  useEffect(() => {
    loadProgressFromMongoDB();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {isLoading && (
        <div className="flex items-center justify-center h-screen">
          <div className="text-xl">Loading coloring activity...</div>
        </div>
      )}
      
      {error && (
        <div className="flex items-center justify-center h-screen">
          <div className="text-xl text-red-600">{error}</div>
        </div>
      )}
      
      {!isLoading && !error && (
        <div className="coloring-activity">
          <div className="toolbar">
            <button onClick={handleHome} className="home-button">
              Home
            </button>
            <div className="image-title">
              {coloringImages[currentImageIndex].title}
            </div>
            <div className="color-picker">
              <button
                className="color-button"
                style={{ backgroundColor: currentColor }}
                onClick={() => setShowColorPicker(!showColorPicker)}
              />
              {showColorPicker && (
                <div className="color-options">
                  {colorOptions.map((color) => (
                    <button
                      key={color.value}
                      className="color-option"
                      style={{ backgroundColor: color.value }}
                      onClick={() => {
                        setCurrentColor(color.value);
                        setShowColorPicker(false);
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
            <input
              type="range"
              min="1"
              max="20"
              value={brushSize}
              onChange={(e) => setBrushSize(Number(e.target.value))}
              className="brush-size"
            />
            <button onClick={clearCanvas} className="clear-button">
              Clear
            </button>
            <div className="navigation-buttons">
              <button onClick={handlePrevImage} className="nav-button">
                Previous
              </button>
              <button onClick={handleNextImage} className="nav-button">
                Next
              </button>
            </div>
            <button onClick={toggleMode} className="toggle-button">
              {isFillMode ? 'Draw' : 'Fill'}
            </button>
            <button onClick={handleErase} className="erase-button">
              Erase
            </button>
            <button onClick={undo} className="undo-button">
              Undo
            </button>
          </div>
          
          <canvas
            ref={canvasRef}
            onMouseDown={isFillMode ? handleFill : startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseOut={stopDrawing}
            className="drawing-canvas"
          />
          <style>{`
            .coloring-activity {
              position: fixed;
              top: 0;
              left: 0;
              width: 100vw;
              height: 100vh;
              display: flex;
              flex-direction: column;
              background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
              overflow: hidden;
            }

            .toolbar {
              position: fixed;
              top: 20px;
              left: 50%;
              transform: translateX(-50%);
              display: flex;
              align-items: center;
              gap: 20px;
              background: white;
              padding: 15px 30px;
              border-radius: 10px;
              box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
              z-index: 1000;
            }

            .home-button {
              padding: 8px 16px;
              background: #4a90e2;
              color: white;
              border: none;
              border-radius: 5px;
              cursor: pointer;
              font-weight: bold;
            }

            .clear-button {
              padding: 8px 16px;
              background: #e74c3c;
              color: white;
              border: none;
              border-radius: 5px;
              cursor: pointer;
            }

            .navigation-buttons {
              display: flex;
              gap: 10px;
            }

            .nav-button {
              padding: 8px 16px;
              background: #9b59b6;
              color: white;
              border: none;
              border-radius: 5px;
              cursor: pointer;
            }

            .color-picker {
              position: relative;
            }

            .color-button {
              width: 40px;
              height: 40px;
              border: 2px solid #ddd;
              border-radius: 50%;
              cursor: pointer;
            }

            .color-options {
              position: absolute;
              top: 100%;
              left: 0;
              display: grid;
              grid-template-columns: repeat(4, 1fr);
              gap: 5px;
              background: white;
              padding: 10px;
              border-radius: 5px;
              box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
              z-index: 1000;
            }

            .color-option {
              width: 30px;
              height: 30px;
              border: none;
              border-radius: 50%;
              cursor: pointer;
            }

            .brush-size {
              width: 100px;
            }

            .image-title {
              font-size: 18px;
              font-weight: bold;
              color: #333;
            }

            .drawing-canvas {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background: white;
              touch-action: none;
            }

            button:hover {
              opacity: 0.9;
            }
          `}</style>
        </div>
      )}
    </div>
  );
};

export default ColoringActivity; 