import { useRef } from "react";
import useRadial from "../../hooks/useRadial";

import styles from './radial.module.css';

interface RadialProps {
  children: (imageUrl: string) => React.ReactNode;
}

function Radial({ children }: RadialProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { handleMouseMove, imageUrl } = useRadial(containerRef);
  return (
    <div
      ref={containerRef}
      className={styles.radial}
      style={{ backgroundColor: 'black' }}
      onMouseMove={handleMouseMove}
    >
      {children(imageUrl)}
    </div>
  );
}

export default Radial;