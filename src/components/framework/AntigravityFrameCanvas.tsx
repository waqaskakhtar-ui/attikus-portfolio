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

  // Draw frame on canvas with aspect-ratio preservation and zoomed-out composition
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
    ctx.fillStyle = '#3F0E13';
    ctx.fillRect(0, 0, width, height);

    // Frame aspect ratio is 1920 / 1080 = 16:9
    const imgRatio = 1920 / 1080;
    const screenRatio = width / height;

    // Zoom out significantly:
    // Scale factor 0.74 on desktop, 0.85 on mobile, ensuring wide composition,
    // visible upper body, and ample breathing room for wide typography.
    const isMobile = width < 768 * (window.devicePixelRatio || 1);
    const zoomFactor = isMobile ? 0.85 : 0.74;

    let drawH: number;
    let drawW: number;

    if (screenRatio > imgRatio) {
      // Widescreen viewport: scale based on height with zoom factor
      drawH = height * zoomFactor;
      drawW = drawH * imgRatio;
    } else {
      // Narrow / portrait viewport
      drawW = width * (isMobile ? 0.92 : 0.84);
      drawH = drawW / imgRatio;
      if (drawH > height * zoomFactor) {
        drawH = height * zoomFactor;
        drawW = drawH * imgRatio;
      }
    }

    // Position centered
    const drawX = (width - drawW) / 2;
    const drawY = (height - drawH) / 2;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, drawX, drawY, drawW, drawH);

    // Subtle edge feathering for 100% seamless blending with surrounding canvas
    const featherSize = Math.min(drawW, drawH) * 0.06;

    // Top feather
    const gradTop = ctx.createLinearGradient(0, drawY, 0, drawY + featherSize);
    gradTop.addColorStop(0, '#3F0E13');
    gradTop.addColorStop(1, 'rgba(63, 14, 19, 0)');
    ctx.fillStyle = gradTop;
    ctx.fillRect(drawX - 2, drawY - 2, drawW + 4, featherSize + 2);

    // Bottom feather
    const gradBottom = ctx.createLinearGradient(0, drawY + drawH, 0, drawY + drawH - featherSize);
    gradBottom.addColorStop(0, '#37090D');
    gradBottom.addColorStop(1, 'rgba(55, 9, 13, 0)');
    ctx.fillStyle = gradBottom;
    ctx.fillRect(drawX - 2, drawY + drawH - featherSize, drawW + 4, featherSize + 2);

    // Left feather
    const gradLeft = ctx.createLinearGradient(drawX, 0, drawX + featherSize, 0);
    gradLeft.addColorStop(0, '#3F0E13');
    gradLeft.addColorStop(1, 'rgba(63, 14, 19, 0)');
    ctx.fillStyle = gradLeft;
    ctx.fillRect(drawX - 2, drawY - 2, featherSize + 2, drawH + 4);

    // Right feather
    const gradRight = ctx.createLinearGradient(drawX + drawW, 0, drawX + drawW - featherSize, 0);
    gradRight.addColorStop(0, '#3F0E13');
    gradRight.addColorStop(1, 'rgba(63, 14, 19, 0)');
    ctx.fillStyle = gradRight;
    ctx.fillRect(drawX + drawW - featherSize, drawY - 2, featherSize + 2, drawH + 4);
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
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-[#3F0E13]">
      <canvas
        ref={canvasRef}
        className="w-full h-full object-contain"
      />
      {/* Seamless Theatrical Vignette Overlay */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/10 to-[#100204]/75 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-44 bg-gradient-to-b from-[#100204]/90 via-[#100204]/30 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-44 bg-gradient-to-t from-[#100204]/90 via-[#100204]/30 to-transparent pointer-events-none" />
    </div>
  );
};
