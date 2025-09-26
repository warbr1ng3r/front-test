import { NotificationsView } from '@widgets/notification-view';
import { Sidebar, Topbar } from '@widgets/sidebar';

import { toClientFeed } from '@entities/notification';

import { fetchServerNotifications } from '../api-server';

import styles from './page.module.css';

export async function NotificationPage() {
  let initial: ReturnType<typeof toClientFeed> | undefined;
  let serverFailed = false;
  try {
    const first = await fetchServerNotifications(10, 0);
    initial = toClientFeed(first, 0);
  } catch {
    serverFailed = true;
  }

  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <Sidebar />
      </aside>
      <main className={styles.main}>
        <Topbar />
        <NotificationsView initial={initial} serverFailed={serverFailed} />
      </main>
    </div>
  );
}
