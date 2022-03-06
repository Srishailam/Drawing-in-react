// Import dependencies
import { useEffect, useRef, useState } from "react";

// Our code
export default function App() {

  const canvasRef = useRef(null);
  const [mouseData, setMouseData] = useState({ x: 0, y: 0 });
  const [canvasCTX, setCanvasCTX] = useState(null);
  const [color, setColor] = useState("#000000"); // Default color is black
  const [size, setSize] = useState(10); // Default size is 10
  
  const SetPos = (e) => {
    // The e variable is the event
    setMouseData({
        x: e.clientX, // Mouse X position
        y: e.clientY, // Mouse Y position
    });
  };

  const Draw = (e) => {
    if (e.buttons !== 1) return; // The left mouse button should be pressed
    const ctx = canvasCTX; // Our saved context
    ctx.beginPath(); // Start the line
    ctx.moveTo(mouseData.x, mouseData.y); // Move the line to the saved mouse location
    setMouseData({
        x: e.clientX, // Update the mouse location
        y: e.clientY, // ^^^^^^^^^^^^^^^^^^^^^^^^^^^
    });
    ctx.lineTo(e.clientX, e.clientY); // Again draw a line to the mouse postion
    ctx.strokeStyle = color; // Set the color as the saved state
    ctx.lineWidth = size; // Set the size to the saved state
    // Set the line cap to round
    ctx.lineCap = "round";
    ctx.stroke(); // Draw it!
  };


  // Set the canvas ctx as the state
  useEffect(() => {
      const canvas = canvasRef.current; // Select the canvas element
      const ctx = canvas.getContext("2d"); // The canvas context
      canvas.width = window.innerWidth; // Set width of the canvas to the width of the screen
      canvas.height = window.innerHeight;// Set height of the canvas to the height of the screen
      setCanvasCTX(ctx); // Finally, set the state
  }, [canvasRef]); // Do this everytime the canvas element is changed

  return (
    <div className="DrawingReactApp">
      <div
        className="controlpanel"
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          width: "100%",
        }}
      >
        <input
          type="range"
          value={size}
          max={40}
          onChange={(e) => {
            setSize(e.target.value);
          }}
        />
        <input
          type="color"
          value={color}
          onChange={(e) => {
            setColor(e.target.value);
          }}
        />
        <button
          onClick={() => {
            const ctx = canvasCTX;
            ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
          }}
        >
          Clear
        </button>
      </div>




      <canvas
        ref={canvasRef}
        onMouseEnter={(e) => SetPos(e)}
        onMouseMove={(e) => {SetPos(e);Draw(e)}}
        onMouseDown={(e) => SetPos(e)}
      ></canvas>
    </div>
  );
}
