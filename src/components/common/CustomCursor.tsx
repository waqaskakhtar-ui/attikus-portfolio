import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const xTo = gsap.quickTo(dot, 'x', { duration: 0.1, ease: 'power2.out' });
    const yTo = gsap.quickTo(dot, 'y', { duration: 0.1, ease: 'power2.out' });
    const ringXTo = gsap.quickTo(ring, 'x', { duration: 0.35, ease: 'power3.out' });
    const ringYTo = gsap.quickTo(ring, 'y', { duration: 0.35, ease: 'power3.out' });

    const handleMouseMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      ringXTo(e.clientX);
      ringYTo(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Precision Center Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-gold-pure pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_rgba(229,169,93,0.8)]"
        aria-hidden="true"
      />
      {/* Ambient Inertial Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-9 h-9 rounded-full border border-gold-pure/30 pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 transition-[transform,border-color] duration-200"
        aria-hidden="true"
      />
    </>
  );
};
