'use client';
import { useContext } from 'react';

import { ThemeContext } from '@shared/providers/theme-provider';

import styles from './ThemeSwitch.module.css';

export function ThemeSwitch() {
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <button className={styles.btn} onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Тема: {theme === 'light' ? 'Светлая' : 'Тёмная'}
    </button>
  );
}
