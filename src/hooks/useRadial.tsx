import { useEffect, useState } from "react";
import {
  angleDegrees,
  normalizeAngle,
  hourFromAngle,
  getBandFromDistance,
  calculateCenter,
  distanceFromCenter,
  calculateVectorFromCenter,
} from "../utils/mouseCalculations";
import { DEAD_ZONE_RADIUS } from "../constants";
import { imageCache } from "../services/imageCache";

interface UseRadialParams {
  containerRef: React.RefObject<HTMLDivElement | null>;
  imgRef: React.RefObject<HTMLImageElement | null>;
  images: Record<number, string[]>;
}

interface UseRadialReturn {
  handleMouseMove: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => void;
  imageUrl: string;
}

function useRadial({
  containerRef,
  imgRef,
  images,
}: UseRadialParams): UseRadialReturn {
  const [imageUrl, setImageUrl] = useState<string>("/images/default.webp");

  useEffect(() => {
    Object.values(images).forEach((filenames) => {
      imageCache.preloadAll(filenames);
    });
  }, [images])

  const handleMouseMove = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (!containerRef.current || !imgRef.current) return;

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
      setImageUrl(imageCache.getSrc(images[0][0]));
      return;
    }

    const angle = normalizeAngle(angleDegrees(dx, dy));
    const hour = hourFromAngle(angle);
    const band = getBandFromDistance(rect, distance);

    setImageUrl(imageCache.getSrc(images[hour][band]));
  };

  return { handleMouseMove, imageUrl };
}

export default useRadial;
