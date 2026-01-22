import { useRef } from "react";
import Radial from "../radial/radial";
import useRadial from "../../hooks/useRadial";

import styles from "./radialAvatar.module.css";

type Hour = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

interface RadialAvatarProps {
  images: Record<Hour, string[]>;
  label: string;
}

function RadialAvatar({ images, label }: RadialAvatarProps) {
  const radialRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const { handleMouseMove, imageUrl } = useRadial({
    containerRef: radialRef,
    imgRef,
    images,
  });

  return (
    <>
      <Radial ref={radialRef} handleMouseMove={handleMouseMove} />
      <div className={styles.border}>
        <img
          ref={imgRef}
          src={imageUrl}
          alt={`${imageUrl} avatar`}
          className={styles.avatar}
        />
      </div>
      <h1 className={styles.label}>{label}</h1>
    </>
  );
}

export default RadialAvatar;
