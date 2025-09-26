import { headers } from 'next/headers';

import { fetchServerGroup } from '@pages/group/api-server';

import { GroupNotificationsView } from '@widgets/group-view';
import { Sidebar, Topbar } from '@widgets/sidebar';

import { toClientFeed } from '@entities/notification';

import styles from './page.module.css';

export async function GroupPage() {
  const headerList = await headers();
  const pathname = headerList.get('x-current-path') || '';

  const arrPath = pathname.split('/');
  const notif_type = arrPath[2];
  const target_id = arrPath[3];

  let initial: ReturnType<typeof toClientFeed> | undefined;

  let serverFailed = false;
  try {
    const first = await fetchServerGroup({
      notif_type,
      target_id,
      limit: 10,
      offest: 0,
    });
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
        <GroupNotificationsView
          notifType={notif_type}
          targetId={target_id}
          initial={initial}
          serverFailed={serverFailed}
        />
      </main>
    </div>
  );
}
