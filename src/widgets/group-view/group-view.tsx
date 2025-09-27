'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef } from 'react';

import { type FeedItem, NotificationCard } from '@entities/notification';

import { BackArrowIcon } from '@shared/icons/back-arrow';
import { EmptyIllustration } from '@shared/ui/empty-illustration';

import { fetchGroup } from './api';
import styles from './group-view.module.css';

type InitialFeed = { items: FeedItem[]; total: number; limit: number; offset: number };

const PAGE_SIZE = 10;

export function GroupNotificationsView({
  notifType,
  targetId,
  initial,
  serverFailed = false,
}: {
  notifType: string;
  targetId: string;
  initial?: InitialFeed;
  serverFailed?: boolean;
}) {
  const router = useRouter();

  const q = useInfiniteQuery({
    queryKey: ['group-infinite', notifType, targetId],
    queryFn: ({ pageParam = 0 }) => fetchGroup(notifType, targetId, PAGE_SIZE, pageParam),
    initialPageParam: 0,
    getNextPageParam: (last) => {
      const nextOffset = last.offset + last.items.length;
      return nextOffset < last.total ? nextOffset : undefined;
    },
    initialData: initial ? { pages: [initial], pageParams: [0] } : undefined,
    retry: false,
  });

  const allItems = useMemo(() => (q.data?.pages ?? []).flatMap((p) => p.items), [q.data]);
  const isEmpty = !q.isLoading && allItems.length === 0;
  console.log(allItems);

  // бесконечная подгрузка
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && q.hasNextPage && !q.isFetchingNextPage) {
            q.fetchNextPage();
          }
        });
      },
      { rootMargin: '400px 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [q.hasNextPage, q.isFetchingNextPage, notifType, targetId]);

  // --- экран ошибки (как в NotificationsView)
  const noClientData = !q.data || q.data.pages.length === 0;
  if ((serverFailed && noClientData) || (q.isError && noClientData)) {
    return (
      <section className={styles.wrap}>
        <div className={styles.error}>
          <EmptyIllustration className={styles.illu} />
          <h3>Что-то пошло не так</h3>
          <p className={styles.muted}>
            Сеть могла отвалиться или сервер не ответил. Обновите страницу или попробуйте снова.
          </p>
          <button className={styles.retryBtn} onClick={() => q.refetch()}>
            Повторить
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.wrap}>
      <div className={styles.header}>
        <div onClick={router.back} className={styles.back}>
          <BackArrowIcon />
        </div>
        <div className={styles.title}>Уведомления группы</div>
      </div>

      {q.isLoading && (!initial || q.data?.pages.length === 0) ? (
        <div className={styles.list}>
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} style={{ borderBottom: '1px solid var(--line)', padding: '12px 16px' }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <div
                  style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--line)' }}
                />
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      height: 12,
                      background: 'var(--line)',
                      borderRadius: 6,
                      width: '60%',
                      marginBottom: 8,
                    }}
                  />
                  <div
                    style={{ height: 12, background: 'var(--line)', borderRadius: 6, width: '80%' }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : isEmpty ? (
        <div className={styles.empty}>
          <EmptyIllustration className={styles.illu} />
          <h3>Пока нет информации</h3>
          <p className={styles.muted}>Здесь будут все записи для выбранной группы уведомлений.</p>
        </div>
      ) : (
        <div className={styles.list}>
          {allItems.map((item) => (
            <NotificationCard key={item.id} item={item} />
          ))}
        </div>
      )}

      <div ref={ref} style={{ height: 1 }} />
      {!q.hasNextPage && q.data && (
        <div className={styles.more} style={{ opacity: 0.6 }}>
          Это всё
        </div>
      )}
    </section>
  );
}
