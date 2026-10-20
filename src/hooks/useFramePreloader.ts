import { useEffect, useState, useRef } from 'react';

const FRAME_START = 2;
const FRAME_END = 80;
export const TOTAL_FRAMES = FRAME_END - FRAME_START + 1; // 79 frames

export const getFrameUrl = (index: number) => {
  const frameNum = index + FRAME_START;
  const padded = frameNum < 10 ? `0${frameNum}` : `${frameNum}`;
  return `/frame-image/${padded}.png`;
};

export function useFramePreloader() {
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    let isMounted = true;
    const loadedImages: HTMLImageElement[] = new Array(TOTAL_FRAMES);
    let loadedCount = 0;

    // Load Frame 0 (02.png) first with top priority
    const firstImg = new Image();
    firstImg.src = getFrameUrl(0);
    loadedImages[0] = firstImg;

    firstImg.onload = () => {
      if (!isMounted) return;
      loadedCount++;
      setProgress((loadedCount / TOTAL_FRAMES) * 100);

      // Load remaining frames
      for (let i = 1; i < TOTAL_FRAMES; i++) {
        const img = new Image();
        img.src = getFrameUrl(i);
        loadedImages[i] = img;

        img.onload = () => {
          if (!isMounted) return;
          loadedCount++;
          const currentPct = (loadedCount / TOTAL_FRAMES) * 100;
          setProgress(currentPct);

          // Once 50% of frames are loaded, mark ready for smooth entrance
          if (loadedCount >= Math.floor(TOTAL_FRAMES * 0.5)) {
            setIsReady(true);
          }
          if (loadedCount === TOTAL_FRAMES) {
            setProgress(100);
            setIsReady(true);
          }
        };

        img.onerror = () => {
          if (!isMounted) return;
          loadedCount++;
          setProgress((loadedCount / TOTAL_FRAMES) * 100);
        };
      }
    };

    imagesRef.current = loadedImages;

    return () => {
      isMounted = false;
    };
  }, []);

  return { progress, isReady, images: imagesRef.current };
}
