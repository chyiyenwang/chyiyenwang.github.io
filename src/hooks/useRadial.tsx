import { useState } from "react";
import {
  angleDegrees,
  normalizeAngle,
  hourFromAngle,
  getBandFromDistance,
  calculateCenter,
  distanceFromCenter,
  calculateVectorFromCenter,
} from "../utils";
import { DEAD_ZONE_RADIUS } from "../constants";

interface UseRadial {
  handleMouseMove: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => void;
  imageUrl: string;
}

const images: Record<number, string[]> = {
  12: ["/12_00.webp", "/12_01.webp", "/12_02.webp", "/12_03.webp"],
  1: ["/01_00.webp", "/01_01.webp", "/01_02.webp", "/01_03.webp"],
  2: ["/02_00.webp", "/02_01.webp", "/02_02.webp", "/02_03.webp"],
  3: ["/03_00.webp", "/03_01.webp", "/03_02.webp", "/03_03.webp"],
  4: ["/04_00.webp", "/04_01.webp", "/04_02.webp", "/04_03.webp"],
  5: ["/05_00.webp", "/05_01.webp", "/05_02.webp", "/05_03.webp"],
  6: ["/06_00.webp", "/06_01.webp", "/06_02.webp", "/06_03.webp"],
  7: ["/07_00.webp", "/07_01.webp", "/07_02.webp", "/07_03.webp"],
  8: ["/08_00.webp", "/08_01.webp", "/08_02.webp", "/08_03.webp"],
  9: ["/09_00.webp", "/09_01.webp", "/09_02.webp", "/09_03.webp"],
  10: ["/10_00.webp", "/10_01.webp", "/10_02.webp", "/10_03.webp"],
  11: ["/11_00.webp", "/11_01.webp", "/11_02.webp", "/11_03.webp"],
};

function useRadial(
  containerRef: React.RefObject<HTMLDivElement | null>,
): UseRadial {
  const [imageUrl, setImageUrl] = useState<string>("/default.webp");

  const handleMouseMove = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (!containerRef.current) return;

    const { clientX, clientY } = event;
    const rect = containerRef.current.getBoundingClientRect();

    const { x: centerX, y: centerY } = calculateCenter(rect);
    const { dx, dy } = calculateVectorFromCenter(
      centerX,
      centerY,
      clientX,
      clientY,
    );

    const distance = distanceFromCenter(dx, dy);

    if (distance <= DEAD_ZONE_RADIUS) {
      setImageUrl("/wink.webp");
      return;
    }

    const angle = normalizeAngle(angleDegrees(dx, dy));
    const hour = hourFromAngle(angle);
    const band = getBandFromDistance(rect, distance);

    setImageUrl(images[hour][band]);
  };

  return { handleMouseMove, imageUrl };
}

export default useRadial;
