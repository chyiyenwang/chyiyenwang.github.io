import { useState } from 'react';

interface UseRadial {
  handleMouseMove: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  backgroundColor: string;
}

const BAND_COUNT = 4;
const DEAD_ZONE_RADIUS = 25;

function useRadial(containerRef: React.RefObject<HTMLDivElement | null>): UseRadial {
  const [backgroundColor, setBackgroundColor] = useState<string>('white');
  
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!containerRef.current) return;

    const { clientX, clientY } = event;
    const rect = containerRef.current.getBoundingClientRect();

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dx = clientX - centerX;
    const dy = clientY - centerY;

    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance <= DEAD_ZONE_RADIUS) return;

    let angle = Math.atan2(dy, dx) * (180 / Math.PI);
    if (angle < 0) angle += 360;

    const hour = Math.floor(((angle + 75) % 360) / 30) + 1;

    const maxRadius = Math.min(rect.width, rect.height) / 2;
    const usableRadius = maxRadius - DEAD_ZONE_RADIUS;
    const bandSize = usableRadius / BAND_COUNT;

    const band = Math.min(
      Math.floor((distance - DEAD_ZONE_RADIUS) / bandSize),
      BAND_COUNT - 1
    );

    const hue = hour * 30;
    const lightness = 40 + band * 12;
    const color = `hsl(${hue}, 80%, ${lightness}%)`;

    console.log({ hour, band, angle });

    setBackgroundColor(color);
  };

  return { handleMouseMove, backgroundColor };
}

export default useRadial;