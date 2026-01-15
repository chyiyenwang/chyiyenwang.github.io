import { useRef } from "react";
import useRadial from "../../hooks/useRadial";

import styles from "./radial.module.css";

interface RadialProps {
  ref: React.RefObject<HTMLDivElement | null>;
  handleMouseMove: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => void;
}

function Radial({ ref, handleMouseMove }: RadialProps) {
  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={styles.radial}
    />
  );
}

export default Radial;
