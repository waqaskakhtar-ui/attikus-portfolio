import React, { useEffect, useRef, useCallback } from 'react';

const FRAME_START = 2;
const FRAME_END = 80;
export const TOTAL_FRAMES = FRAME_END - FRAME_START + 1; // 79 frames

interface AntigravityFrameCanvasProps {
  images: HTMLImageElement[];
  scrollProgress: number; // 0 to 1 across the full journey
}

export const AntigravityFrameCanvas: React.FC<AntigravityFrameCanvasProps> = ({ images, scrollProgress }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const currentFrameRef = useRef<number>(0);
  const targetFrameRef = useRef<number>(0);
  const rafIdRef = useRef<number | null>(null);

  // Draw frame on canvas with aspect-ratio preservation
  const drawFrame = useCallback((frameIdx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = images[frameIdx];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const width = canvas.width;
    const height = canvas.height;

    // Deep studio wine-red background fill
    ctx.fillStyle = '#380A0E';
    ctx.fillRect(0, 0, width, height);

    // Frame aspect ratio is 1920 / 1080 = 16:9
    const imgRatio = 1920 / 1080;

    // Height-based fit ensures the character (from head to shoes) remains fully visible on all viewports
    const drawH = height;
    const drawW = height * imgRatio;
    const drawX = (width - drawW) / 2;
    const drawY = 0;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, drawX, drawY, drawW, drawH);
  }, [images]);

  // Handle Resize with DPR awareness
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();

    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);

    drawFrame(Math.round(currentFrameRef.current));
  }, [drawFrame]);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  // Initial Paint: Draw Frame 2 (index 0) immediately
  useEffect(() => {
    if (images.length > 0 && images[0]?.complete) {
      drawFrame(0);
    }
  }, [images, drawFrame]);

  // Update target frame based on global scroll progress
  useEffect(() => {
    // Map scrollProgress (0 to 1) across the 79 frames (0 to 78)
    const target = Math.max(0, Math.min(TOTAL_FRAMES - 1, scrollProgress * (TOTAL_FRAMES - 1)));
    targetFrameRef.current = target;
  }, [scrollProgress]);

  // Smooth Lerp Render Loop (60-120fps)
  useEffect(() => {
    const checkReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const renderLoop = () => {
      if (checkReducedMotion) {
        currentFrameRef.current = targetFrameRef.current;
        drawFrame(Math.round(targetFrameRef.current));
      } else {
        const diff = targetFrameRef.current - currentFrameRef.current;
        if (Math.abs(diff) > 0.01) {
          currentFrameRef.current += diff * 0.18;
          const frameToDraw = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.round(currentFrameRef.current)));
          drawFrame(frameToDraw);
        }
      }
      rafIdRef.current = requestAnimationFrame(renderLoop);
    };

    rafIdRef.current = requestAnimationFrame(renderLoop);

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [drawFrame]);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-[#380A0E]">
      <canvas
        ref={canvasRef}
        className="w-full h-full object-contain"
      />
      {/* Cinematic Vignette Overlay */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/20 to-black/70 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#050507] via-[#050507]/60 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#160204] via-[#160204]/60 to-transparent pointer-events-none" />
    </div>
  );
};
