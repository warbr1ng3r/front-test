'use client';
import styles from './Tabs.module.css';
type Tab = { key: string; label: string };
export function Tabs({
  value,
  onChange,
  tabs,
}: {
  value: string;
  onChange: (v: any) => void;
  tabs: Tab[];
}) {
  return (
    <div className={styles.tabs}>
      {tabs.map((t) => (
        <button
          key={t.key}
          className={[styles.tab, value === t.key ? styles.active : ''].join(' ')}
          onClick={() => onChange(t.key)}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
