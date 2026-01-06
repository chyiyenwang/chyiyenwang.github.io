import { useState } from 'react';
import {
  angleDegrees,
  normalizeAngle,
  hourFromAngle,
  getBandFromDistance,
  calculateCenter,
  distanceFromCenter,
  calculateVectorFromCenter
} from '../utils';

interface UseRadial {
  handleMouseMove: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  backgroundColor: string;
}

const DEAD_ZONE_RADIUS = 25;

function useRadial(containerRef: React.RefObject<HTMLDivElement | null>): UseRadial {
  const [backgroundColor, setBackgroundColor] = useState<string>('white');
  
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!containerRef.current) return;

    const { clientX, clientY } = event;
    const rect = containerRef.current.getBoundingClientRect();

    const { x: centerX, y: centerY } = calculateCenter(rect);
    const { dx, dy } = calculateVectorFromCenter(centerX, centerY, clientX, clientY);

    const distance = distanceFromCenter(dx, dy);

    if (distance <= DEAD_ZONE_RADIUS) return;

    const angle = normalizeAngle(angleDegrees(dx, dy));
    const hour = hourFromAngle(angle);
    const band = getBandFromDistance(rect, distance);

    const hue = hour * 30;
    const lightness = 40 + band * 12;
    const color = `hsl(${hue}, 80%, ${lightness}%)`;

    setBackgroundColor(color);
  };

  return { handleMouseMove, backgroundColor };
}

export default useRadial;