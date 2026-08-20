import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

function getInitialTheme(): Theme {
  const attr = document.documentElement.getAttribute('data-theme');
  return attr === 'dark' ? 'dark' : 'light';
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  function toggle() {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    try {
      localStorage.setItem('maktaba-theme', next);
    } catch {
      // ignore (e.g. private browsing)
    }
    setTheme(next);
  }

  return (
    <button className="theme-toggle" type="button" aria-label="Basculer le thème" onClick={toggle}>
      {theme === 'dark' ? '☀' : '☾'}
    </button>
  );
}
