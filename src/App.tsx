import { useState } from 'react';
import linkedinIcon from '/icon-linkedin.svg';
import githubIcon from '/icon-github.svg';
import Link from './components/link/link';

import './App.css'

const bandSize = 200;

function App() {
  const [backgroundColor, setBackgroundColor] = useState<string>('red');

  const handleMouseMove = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const { clientX, clientY } = event;

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    const dx = clientX - centerX;
    const dy = centerY - clientY;

    let angle = Math.atan2(dy, dx) * (180 / Math.PI);
    if (angle < 0) angle += 360;

    const hour = Math.floor(((angle + 90) % 360) / 30) + 1;

    const distance = Math.sqrt(dx * dx + dy * dy);
    const band = Math.min(Math.floor(distance / bandSize), 3);

    const hue = hour * 30;
    const lightness = 40 + band * 15;

    const color = `hsl(${hue}, 80%, ${lightness}%)`;

    setBackgroundColor(color);
  };


  return (
    <div
      className='background'
      style={{ backgroundColor: backgroundColor }}
      onMouseMove={handleMouseMove}
    >
      <h1>Chyi Wang</h1>
      <div className="links">
        <Link
          label='LinkedIn'
          icon={linkedinIcon}
          href='https://linkedin.com/in/chyiyenwang'
          color='linkedin'
        />
        <Link
          label='Github'
          icon={githubIcon}
          href='https://github.com/chyiyenwang'
          color='github'
        />
      </div>
    </div>
  )
}

export default App
