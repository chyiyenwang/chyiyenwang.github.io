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
  clientY: number
) {
    const dx = clientX - centerX;
    const dy = clientY - centerY;
    return { dx, dy };
}

export function distanceFromCenter(dx: number, dy: number) {
    return Math.sqrt(dx * dx + dy * dy);
}

export function angleDegrees(dx: number, dy: number) {
    return Math.atan2(dy, dx) * (180 / Math.PI);
}

export function normalizeAngle(angle: number) {
    return (angle + 360) % 360;
}

export function hourFromAngle(angle:number) {
    return Math.floor(((angle + 75) % 360) / 30) + 1;
}

export function getBandFromDistance(rect: DOMRect, distance: number) {
    const maxRadius = Math.min(rect.width, rect.height) / 2;
    const usableRadius = maxRadius - DEAD_ZONE_RADIUS;
    const bandSize = usableRadius / BAND_COUNT;

    return Math.min(
        Math.floor((distance - DEAD_ZONE_RADIUS) / bandSize),
        BAND_COUNT - 1
    );
}