import { FeedItem, GroupedNotification, NotificationItem } from '@entities/notification';

import { timeAgo } from '@shared/lib/time-ago';

export function toFeedItem(
  x: NotificationItem | GroupedNotification,
  i: number,
  offset: number,
): FeedItem {
  return {
    id: `${x.type}:${x.target_id ?? 'none'}:${offset + i}`,
    target_id: x.target_id || '',
    type: x.type as FeedItem['type'],
    text: x.text,
    time: timeAgo(x.created),
    author: {
      name: x.user?.name ?? 'User',
      username: x.user?.username ?? 'user',
      avatar: x.user?.avatar || '',
    },
    grouped: Array.isArray((x as any).users),
    groupKey: `${x.type}:${x.target_id ?? ''}`,
    image: (x as any).image ?? undefined,
  };
}

export async function fetchGroup(
  notifType: string,
  targetId: string,
  limit = 20,
  offset = 0,
): Promise<{ items: FeedItem[]; total: number; limit: number; offset: number }> {
  const res = await fetch(
    `/api/notifications/group/${notifType}/${targetId}?limit=${limit}&offset=${offset}`,
  );
  if (!res.ok) throw new Error('Failed to load group');

  const data = await res.json();
  const items: FeedItem[] = (data.results ?? []).map((x: any, i: number) =>
    toFeedItem(x, i, data.offset || 0),
  );

  return {
    items,
    total: data.total ?? items.length,
    limit: data.limit ?? limit,
    offset: data.offset ?? offset,
  };
}
