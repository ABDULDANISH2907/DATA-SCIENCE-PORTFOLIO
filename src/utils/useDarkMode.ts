import { useState, useEffect, useCallback } from 'react';

type Theme = 'dark' | 'light';

export function useDarkMode() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme') as Theme | null;
      if (saved) return saved;
      return window.matchMedia('(prefers-color-scheme: light)').matches
        ? 'light'
        : 'dark';
    }
    return 'dark';
  });

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.remove('dark');
      root.classList.add('light');
      root.style.setProperty('--color-dark-bg', '#ffffff');
      root.style.setProperty('--color-dark-surface', '#f3f4f6');
      root.style.setProperty('--color-dark-elevated', '#e5e7eb');
      root.style.setProperty('--color-dark-border', '#d1d5db');
      root.style.setProperty('--color-text-primary', '#111827');
      root.style.setProperty('--color-text-secondary', '#4b5563');
      root.style.setProperty('--color-text-muted', '#9ca3af');
    } else {
      root.classList.add('dark');
      root.classList.remove('light');
      root.style.setProperty('--color-dark-bg', '#0a0a0a');
      root.style.setProperty('--color-dark-surface', '#111111');
      root.style.setProperty('--color-dark-elevated', '#1a1a1a');
      root.style.setProperty('--color-dark-border', '#2a2a2a');
      root.style.setProperty('--color-text-primary', '#f3f4f6');
      root.style.setProperty('--color-text-secondary', '#9ca3af');
      root.style.setProperty('--color-text-muted', '#6b7280');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  return { theme, toggleTheme };
}
