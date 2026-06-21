"use client";

import { useEffect, useRef, useState } from "react";

interface Bubble {
  id: number;
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  color: string;
  opacity: number;
}

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  
  const wandRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // High performance state refs to avoid React re-renders on mousemove or RAF ticks
  const stateRef = useRef({
    x: -100,
    y: -100,
    isHovering: false,
    isBrushing: false
  });
  
  const bubblesRef = useRef<Bubble[]>([]);

  useEffect(() => {
    // Enable custom cursor only on desktop devices
    if (!window.matchMedia("(pointer: fine)").matches) return;
    
    setIsVisible(true);
    document.documentElement.classList.add("hide-cursor");

    // Set initial canvas dimensions
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };

    const updateMousePosition = (e: MouseEvent) => {
      stateRef.current.x = e.clientX;
      stateRef.current.y = e.clientY;
      
      const target = e.target as HTMLElement;
      stateRef.current.isHovering = !!target.closest('a, button, input, textarea, select, [role="button"]');
    };

    const handleMouseDown = (e: MouseEvent) => {
      if (e.button === 2) { // Right-click triggers brushing
        stateRef.current.isBrushing = true;
      }
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (e.button === 2) {
        stateRef.current.isBrushing = false;
      }
    };

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault(); // Suppress browser right-click menu site-wide
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("contextmenu", handleContextMenu);

    // 60FPS Render Loop using requestAnimationFrame for zero-lag rendering
    let animFrame: number;
    let lastSpawn = 0;
    let currentRotation = 0;

    const renderLoop = (timestamp: number) => {
      const state = stateRef.current;
      const wand = wandRef.current;
      const canvas = canvasRef.current;
      
      // 1. Update and animate the Brush Wand Element directly in DOM
      if (wand) {
        // High frequency scrubbing vibration coordinates offset
        const rx = state.isBrushing ? (Math.random() - 0.5) * 5 : 0;
        const ry = state.isBrushing ? (Math.random() - 0.5) * 5 : 0;
        const scale = state.isBrushing ? 1.2 : state.isHovering ? 1.1 : 1.0;
        
        // Spin the radial cursor (slowly normally, rapidly during brushing)
        const rotationSpeed = state.isBrushing ? 1.2 : state.isHovering ? 0.25 : 0.08;
        currentRotation += rotationSpeed;
        
        wand.style.transform = `translate(${state.x + rx}px, ${state.y + ry}px) translate(-50%, -50%) rotate(${currentRotation * 57.29}deg) scale(${scale})`;
      }

      // 2. Animate and Draw Foam Bubbles on HTML5 Canvas
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          // Clear previous canvas frame
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          
          // Spawn new bubble if brushing (throttle: 1 bubble per 25ms)
          if (state.isBrushing && timestamp - lastSpawn > 25) {
            lastSpawn = timestamp;
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 2 + 1;
            
            bubblesRef.current.push({
              id: Math.random(),
              x: state.x + (Math.random() - 0.5) * 4,
              y: state.y + (Math.random() - 0.5) * 4,
              size: Math.random() * 8 + 4,
              vx: Math.cos(angle) * speed + (Math.random() - 0.5) * 1.5,
              vy: -Math.random() * 4 - 3.5, // Floats up
              color: Math.random() > 0.45 ? "rgba(186, 230, 253, 0.7)" : "rgba(255, 255, 255, 0.8)",
              opacity: Math.random() * 0.4 + 0.6
            });
          }

          // Update, filter, and draw bubble particles
          const bubbles = bubblesRef.current;
          for (let i = bubbles.length - 1; i >= 0; i--) {
            const b = bubbles[i];
            
            b.x += b.vx;
            b.y += b.vy;
            b.vy += 0.08; // air resistance
            b.size *= 1.018; // expand slightly
            b.opacity -= 0.016; // fade out

            if (b.opacity <= 0) {
              bubbles.splice(i, 1);
              continue;
            }

            ctx.save();
            ctx.globalAlpha = b.opacity;

            // Draw bubble circle
            ctx.beginPath();
            ctx.arc(b.x, b.y, b.size, 0, Math.PI * 2);
            ctx.fillStyle = b.color;
            ctx.fill();

            // Bubble border
            ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
            ctx.lineWidth = 1;
            ctx.stroke();

            // 3D glossy highlight sheen (reflects light in top-left)
            ctx.beginPath();
            ctx.arc(b.x - b.size * 0.3, b.y - b.size * 0.3, b.size * 0.28, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(255, 255, 255, 0.75)";
            ctx.fill();

            ctx.restore();
          }
        }
      }

      animFrame = requestAnimationFrame(renderLoop);
    };

    animFrame = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("contextmenu", handleContextMenu);
      cancelAnimationFrame(animFrame);
      document.documentElement.classList.remove("hide-cursor");
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* 1. Fullscreen Canvas for Soap Foam Bubbles */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[99999]"
      />

      {/* 2. Compact Glowing Radial Instrument Cursor */}
      <div
        ref={wandRef}
        className="fixed top-0 left-0 pointer-events-none z-[100000] origin-center will-change-transform"
        style={{ transform: "translate(-100px, -100px) translate(-50%, -50%)" }}
      >
        <svg
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-9 h-9 drop-shadow-[0_2px_8px_rgba(14,165,233,0.3)]"
        >
          {/* Outer rotating dashed ring */}
          <circle
            cx="32"
            cy="32"
            r="26"
            stroke="url(#cursor-ring-grad)"
            strokeWidth="2"
            strokeDasharray="6 4"
          />
          <circle
            cx="32"
            cy="32"
            r="19"
            stroke="rgba(56, 189, 248, 0.2)"
            strokeWidth="1"
          />

          {/* Radial Rays representing medical micro-bristles */}
          <path
            d="M32 6v5M32 53v5M6 32h5M53 32h5M13.6 13.6l3.5 3.5M46.9 46.9l3.5 3.5M13.6 50.4l3.5-3.5M46.9 17.1l3.5-3.5"
            stroke="#38bdf8"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Inner Glowing Active Polisher Core */}
          <circle cx="32" cy="32" r="7.5" fill="url(#cursor-core-grad)" />
          <circle cx="32" cy="32" r="2.5" fill="#ffffff" />

          <defs>
            <linearGradient id="cursor-ring-grad" x1="0" y1="0" x2="64" y2="64">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#0ea5e9" />
            </linearGradient>
            <radialGradient id="cursor-core-grad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="60%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#0ea5e9" />
            </radialGradient>
          </defs>
        </svg>
      </div>
    </>
  );
}
