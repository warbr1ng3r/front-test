import { Sidebar } from '@widgets/sidebar';

import { SkeletonCard } from '@shared/ui/skeleton-card';

import styles from './page.module.css';
export function Loading() {
  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <Sidebar />
      </aside>
      <main className={styles.main}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} style={{ borderBottom: '1px solid var(--line)', padding: '12px 16px' }}>
              <SkeletonCard />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
