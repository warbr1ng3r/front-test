import type { FeedItem } from '@entities/notification/notification-card';
const API_BASE = '';

type User = {
  online: boolean;
  avatar: string;
  name: string;
  username: string;
  sex: string;
  verified: boolean;
};
type NotificationItem = {
  type: string;
  target_id: string | null;
  user: User;
  text: string;
  created: string;
  image?: string | null;
};
type GroupedNotification = {
  type: string;
  target_id: string | null;
  user: User;
  text: string;
  created: string;
  image?: string | null;
  users: User[];
  other_count: number;
};
type NotificationResponse = {
  total: number;
  limit: number;
  offset: number;
  results: (NotificationItem | GroupedNotification)[];
};

function avatarFallback(seed: string) {
  return `https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=${encodeURIComponent(seed)}`;
}
function timeAgo(input: string): string {
  const d = new Date(input);
  const now = new Date();
  const diff = Math.max(0, (now.getTime() - d.getTime()) / 1000);
  const min = Math.floor(diff / 60);
  if (min < 1) return 'только что';
  if (min < 60) return `${min} мин`;
  const hours = Math.floor(min / 60);
  if (hours < 24) return `${hours} ч`;
  const days = Math.floor(hours / 24);
  if (days === 1) return 'вчера';
  return `${days} дн`;
}

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
      avatar: x.user?.avatar || avatarFallback(String(i + offset)),
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
  const res = await fetch(`${API_BASE}/api/notifications?limit=${limit}&offset=${offset}`, {
    next: { revalidate: false },
  });
  if (!res.ok) throw new Error('Failed to load notification');
  const data = (await res.json()) as NotificationResponse;
  const items = (data.results ?? []).map((x, i) => toFeedItem(x, i, data.offset || 0));
  return { items, total: data.total, limit: data.limit, offset: data.offset };
}
