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
  imageUrl: string | null;
}

const DEAD_ZONE_RADIUS = 25;

const images = {
  12: ['12_00.png', '12_01.png', '12_02.png', '12_03.png'],
  1: ['01_00.png', '01_01.png', '01_02.png', '01_03.png'],
  2: ['02_00.png', '02_01.png', '02_02.png', '02_03.png'],
  3: ['03_00.png', '03_01.png', '03_02.png', '03_03.png'],
  4: ['04_00.png', '04_01.png', '04_02.png', '04_03.png'],
  5: ['05_00.png', '05_01.png', '05_02.png', '05_03.png'],
  6: ['06_00.png', '06_01.png', '06_02.png', '06_03.png'],
  7: ['07_00.png', '07_01.png', '07_02.png', '07_03.png'],
  8: ['08_00.png', '08_01.png', '08_02.png', '08_03.png'],
  9: ['09_00.png', '09_01.png', '09_02.png', '09_03.png'],
  10: ['10_00.png', '10_01.png', '10_02.png', '10_03.png'],
  11: ['11_00.png', '11_01.png', '11_02.png', '11_03.png'],
}

function useRadial(containerRef: React.RefObject<HTMLDivElement | null>): UseRadial {
  const [backgroundColor, setBackgroundColor] = useState<string>('white');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  
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
    setImageUrl(images[hour][band]);
  };

  return { handleMouseMove, backgroundColor, imageUrl };
}

export default useRadial;