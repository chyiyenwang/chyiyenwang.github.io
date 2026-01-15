import linkedinIcon from "/images/icon-linkedin.svg";
import githubIcon from "/images/icon-github.svg";
import Link from "./components/link/link";

import styles from "./App.module.css";
import RadialAvatar from "./components/radialAvatar/radialAvatar";
import { IMAGES } from "./constants";

function App() {
  return (
    <>
      <div className={styles["avatar-container"]}>
        <RadialAvatar images={IMAGES} name="Chyi Wang" />
      </div>
      <div className={styles.links}>
        <Link
          label="LinkedIn"
          icon={linkedinIcon}
          href="https://linkedin.com/in/chyiyenwang"
          brand="linkedin"
        />
        <Link
          label="Github"
          icon={githubIcon}
          href="https://github.com/chyiyenwang"
          brand="github"
        />
      </div>
    </>
  );
}

export default App;
