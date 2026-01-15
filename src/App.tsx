import { useRef } from "react";
import linkedinIcon from "/images/icon-linkedin.svg";
import githubIcon from "/images/icon-github.svg";
import Link from "./components/link/link";
import Radial from "./components/radial/radial";
import useRadial from "./hooks/useRadial";

import "./App.css";

function App() {
  const radialRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const { handleMouseMove, imageUrl } = useRadial(radialRef, imgRef);

  return (
    <>
      <div className="avatar-container">
        <Radial
          ref={radialRef}
          handleMouseMove={handleMouseMove}
        />
        <img ref={imgRef} src={`/images/${imageUrl}`} alt="avatar" className="avatar" />
        <h1 className="title">Chyi Wang</h1>
      </div>
      <div className="links">
        <Link
          label="LinkedIn"
          icon={linkedinIcon}
          href="https://linkedin.com/in/chyiyenwang"
          color="linkedin"
        />
        <Link
          label="Github"
          icon={githubIcon}
          href="https://github.com/chyiyenwang"
          color="github"
        />
      </div>
    </>
  );
}

export default App;
