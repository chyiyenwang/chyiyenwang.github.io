import { useState } from "react";
import {
  angleDegrees,
  normalizeAngle,
  hourFromAngle,
  getBandFromDistance,
  calculateCenter,
  distanceFromCenter,
  calculateVectorFromCenter,
} from "../utils/mouseCalculations";
import { DEAD_ZONE_RADIUS, IMAGES } from "../constants";
import { imageCache } from "../services/imageCache";

interface UseRadial {
  handleMouseMove: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => void;
  imageUrl: string;
}

function useRadial(
  containerRef: React.RefObject<HTMLDivElement | null>,
  imgRef: React.RefObject<HTMLImageElement | null>,
): UseRadial {
  const [imageUrl, setImageUrl] = useState<string>("/default.webp");

  const handleMouseMove = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (!containerRef.current || !imgRef.current) return;
    console.log(event);

    const { clientX, clientY } = event;
    const rect = containerRef.current.getBoundingClientRect();
    const img = imgRef.current.getBoundingClientRect();

    const { x: centerX, y: centerY } = calculateCenter(img);
    const { dx, dy } = calculateVectorFromCenter(
      centerX,
      centerY,
      clientX,
      clientY,
    );

    const distance = distanceFromCenter(dx, dy);

    if (distance <= DEAD_ZONE_RADIUS) {
      setImageUrl(imageCache.getSrc(IMAGES[0][0]));
      return;
    }

    const angle = normalizeAngle(angleDegrees(dx, dy));
    const hour = hourFromAngle(angle);
    const band = getBandFromDistance(rect, distance);

    setImageUrl(imageCache.getSrc(IMAGES[hour][band]));
  };

  return { handleMouseMove, imageUrl  };
}

export default useRadial;