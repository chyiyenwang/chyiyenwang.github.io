import { useState, useRef, useEffect } from "react";
import useRadial from "../../hooks/useRadial";

import styles from './radial.module.css';

function Radial({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { handleMouseMove, backgroundColor } = useRadial(containerRef);

  return (
    <div
      ref={containerRef}
      className={styles.radial}
      style={{ backgroundColor }}
      onMouseMove={handleMouseMove}
    >
      {children}
    </div>
  );
}

export default Radial;