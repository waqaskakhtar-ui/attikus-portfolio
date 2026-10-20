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

    // Fast concurrent preloader with HTTP/2 multiplexing & GPU image decoding
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      // Prioritize the initial hero sequence
      if (i < 16) {
        img.setAttribute('fetchpriority', 'high');
      }
      img.src = getFrameUrl(i);
      loadedImages[i] = img;

      const handleDone = () => {
        if (!isMounted) return;
        loadedCount++;
        const currentPct = Math.round((loadedCount / TOTAL_FRAMES) * 100);
        setProgress(currentPct);

        // Transition smoothly into the hero experience as soon as the first 16 frames are ready
        if (loadedCount >= 16 || currentPct >= 30) {
          setIsReady(true);
        }
        if (loadedCount === TOTAL_FRAMES) {
          setProgress(100);
          setIsReady(true);
        }
      };

      if (img.complete && img.naturalWidth !== 0) {
        handleDone();
      } else {
        img.onload = () => {
          // Decode image off the main thread to prevent frame drops
          if ('decode' in img) {
            img.decode().then(handleDone).catch(handleDone);
          } else {
            handleDone();
          }
        };
        img.onerror = handleDone;
      }
    }

    imagesRef.current = loadedImages;

    return () => {
      isMounted = false;
    };
  }, []);

  return { progress, isReady, images: imagesRef.current };
}
