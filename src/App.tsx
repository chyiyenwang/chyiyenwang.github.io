import { useEffect, useState } from 'react';
import linkedinIcon from '/icon-linkedin.svg';
import githubIcon from '/icon-github.svg';
import Link from './components/link/link';

import './App.css'

function App() {
  return (
    <>
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
    </>
  )
}

export default App
