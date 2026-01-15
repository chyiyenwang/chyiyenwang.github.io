import { useRef } from "react";
import Radial from "../radial/radial";
import useRadial from "../../hooks/useRadial";

import styles from "./radialAvatar.module.css";

interface RadialAvatarProps {
  images: Record<number, string[]>;
  name: string;
}

function RadialAvatar({ images, name }: RadialAvatarProps) {
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
      <img ref={imgRef} src={imageUrl} alt="avatar" className="avatar" />
      <h1 className={styles.name}>{name}</h1>
    </>
  );
}

export default RadialAvatar;
