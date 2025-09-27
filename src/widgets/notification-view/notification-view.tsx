'use client';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useRef, useState } from 'react';

import { type FeedItem, NotificationCard } from '@entities/notification';

import { DotsIcon } from '@shared/icons/dots';
import { EmptyIllustration } from '@shared/ui/empty-illustration';
import { Tabs } from '@shared/ui/tabs';

import { fetchNotifications } from './api';
import styles from './notification-view.module.css';

export type TabKey = 'all' | 'social' | 'actions';
type InitialFeed = { items: FeedItem[]; total: number; limit: number; offset: number };

const PAGE_SIZE = 10;

export function NotificationsView({
  initial,
  serverFailed = false,
}: {
  initial?: InitialFeed;
  serverFailed?: boolean;
}) {
  const [tab, setTab] = useState<TabKey>('all');

  const q = useInfiniteQuery({
    queryKey: ['feed-infinite'],
    queryFn: ({ pageParam = 0 }) => fetchNotifications(PAGE_SIZE, pageParam),
    initialPageParam: 0,
    getNextPageParam: (last) => {
      const nextOffset = last.offset + last.items.length;
      return nextOffset < last.total ? nextOffset : undefined;
    },
    initialData: initial ? { pages: [initial], pageParams: [0] } : undefined,
    retry: false,
  });

  const allItems = useMemo(() => (q.data?.pages ?? []).flatMap((p) => p.items), [q.data]);

  const filtered = useMemo(() => {
    switch (tab) {
      case 'social':
        return allItems.filter((it) => ['comment', 'like'].includes(it.type));
      case 'actions':
        return allItems.filter((it) => ['repost', 'follow'].includes(it.type));
      default:
        return allItems;
    }
  }, [allItems, tab]);

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
  }, [q.hasNextPage, q.isFetchingNextPage]);

  const isEmpty = !q.isLoading && filtered.length === 0;

  if (q.isError && (!q.data || q.data.pages.length === 0)) {
    return (
      <section className={styles.wrap}>
        <div className={styles.error}>
          <EmptyIllustration className={styles.illu} />
          <h3>Что‑то пошло не так</h3>
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
        <div className={styles.title}>
          <span>Уведомления</span>
          <button className={styles.dots}>
            <DotsIcon />
          </button>
        </div>
        <Tabs
          value={tab}
          onChange={setTab}
          tabs={[
            { key: 'all', label: 'Все' },
            { key: 'social', label: 'Общение' },
            { key: 'actions', label: 'Действия' },
          ]}
        />
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
          <p className={styles.muted}>
            Репосты, отметки «Нравится» и многое другое — здесь вы найдете все взаимодействия с
            контентом.
          </p>
        </div>
      ) : (
        <div className={styles.list}>
          {filtered.map((item) => (
            <NotificationCard key={item.id} item={item} />
          ))}
        </div>
      )}

      <div ref={ref} style={{ height: 1 }} />
      {!q.hasNextPage && (
        <div className={styles.more} style={{ opacity: 0.6 }}>
          Это всё
        </div>
      )}
    </section>
  );
}
