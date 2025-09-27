import {
  FeedItem,
  GroupedNotification,
  NotificationItem,
  NotificationResponse,
} from '@entities/notification';

import { baseUrl } from '@shared/api';
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
    mentions: Array.isArray((x as any).users)
      ? ((x as any).users as any[]).map((u) => ({
          name: u?.name ?? 'User',
          username: u?.username ?? 'user',
          avatar: u?.avatar ?? '',
        }))
      : undefined,
  };
}

export async function fetchNotifications(
  limit = 10,
  offset = 0,
): Promise<{ items: FeedItem[]; total: number; limit: number; offset: number }> {
  const res = await fetch(`/api/notifications?limit=${limit}&offset=${offset}`, {
    next: { revalidate: false },
  });
  if (!res.ok) throw new Error('Failed to load notification');
  const data = (await res.json()) as NotificationResponse;
  const items = (data.results ?? []).map((x, i) => toFeedItem(x, i, data.offset || 0));
  return { items, total: data.total, limit: data.limit, offset: data.offset };
}
