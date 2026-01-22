import { BAND_COUNT, DEAD_ZONE_RADIUS } from "../constants";

export function calculateCenter(rect: DOMRect) {
  return {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2,
  };
}

export function calculateVectorFromCenter(
  centerX: number,
  centerY: number,
  clientX: number,
  clientY: number,
) {
  const dx = clientX - centerX;
  const dy = clientY - centerY;
  return { dx, dy };
}

export function distanceFromCenter(dx: number, dy: number) {
  return Math.hypot(dx, dy);
}

export function angleDegrees(dx: number, dy: number) {
  return Math.atan2(dy, dx) * (180 / Math.PI);
}

export function normalizeAngle(angle: number) {
  return (angle + 360) % 360;
}

type Hour = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
const CLOCK_OFFSET = 75;
const DEGREES_PER_HOUR = 30;
export function hourFromAngle(angle: number): Hour {
  const hour = Math.floor(((angle + CLOCK_OFFSET) % 360) / DEGREES_PER_HOUR) + 1;

  if (hour < 0 || hour > 12) {
    throw new Error("Invaliad hour");
  }

  return hour as Hour;
}

export function getBandFromDistance(rect: DOMRect, distance: number) {
  const maxRadius = Math.min(rect.width, rect.height) / 2;
  const usableRadius = maxRadius - DEAD_ZONE_RADIUS;
  const bandSize = usableRadius / BAND_COUNT;

  return Math.min(
    Math.floor((distance - DEAD_ZONE_RADIUS) / bandSize),
    BAND_COUNT - 1,
  );
}
