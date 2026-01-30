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

type Hour = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

interface UseRadialParams {
  containerRef: React.RefObject<HTMLDivElement | null>;
  imgRef: React.RefObject<HTMLImageElement | null>;
  images: Record<Hour, string[]>;
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
  const [rect, setRect] = useState<DOMRect | null>(null);
  const [img, setImg] = useState<DOMRect | null>(null);

  useEffect(() => {
    if (!containerRef.current || !imgRef.current) return;

    setRect(containerRef.current.getBoundingClientRect());
    setImg(imgRef.current.getBoundingClientRect());
  }, [
    containerRef.current,
    imgRef.current,
    window.innerHeight,
    window.innerWidth,
  ]);

  useEffect(() => {
    Object.values(images).forEach((filenames) => {
      imageCache.preloadAll(filenames);
    });
  }, [images]);

  const handleMouseMove = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (!rect || !img) return;

    const { clientX, clientY } = event;

    const { x: centerX, y: centerY } = calculateCenter(img);
    const { dx, dy } = calculateVectorFromCenter(
      centerX,
      centerY,
      clientX,
      clientY,
    );

    const distance = distanceFromCenter(dx, dy);

    if (distance <= DEAD_ZONE_RADIUS) {
      if (!images[0] || images[0].length == 0) return;

      const winkImage = images[0][0];
      const src = imageCache.getSrc(winkImage);
      setImageUrl((prev) => (prev === src ? prev : src));
      return;
    }

    const angle = normalizeAngle(angleDegrees(dx, dy));
    const hour = hourFromAngle(angle);
    const band = getBandFromDistance(rect, distance);

    if (!images[hour] || !images[hour][band]) return;

    const src = imageCache.getSrc(images[hour][band]);

    setImageUrl((prev) => (prev === src ? prev : src));
  };

  return { handleMouseMove, imageUrl };
}

export default useRadial;
