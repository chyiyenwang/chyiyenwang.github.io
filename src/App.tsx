import linkedinIcon from "/images/icon-linkedin.svg";
import githubIcon from "/images/icon-github.svg";
import Link from "./components/link/link";

import "./App.css";
import RadialAvatar from "./components/radialAvatar/radialAvatar";
import { IMAGES } from "./constants";

function App() {
  return (
    <>
      <div className="avatar-container">
        <RadialAvatar images={IMAGES} name="Chyi Wang" />
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
