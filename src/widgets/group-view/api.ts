import type { FeedItem } from '@entities/notification/notification-card';

export async function fetchGroup(
  notifType: string,
  targetId: string,
  limit = 20,
  offset = 0,
): Promise<{ items: FeedItem[]; total: number; limit: number; offset: number }> {
  const res = await fetch(
    `/api/notifications/group/${encodeURIComponent(notifType)}/${encodeURIComponent(targetId)}?limit=${limit}&offset=${offset}`,
  );
  if (!res.ok) throw new Error('Failed to load group');

  const data = await res.json();
  const items: FeedItem[] = (data.results ?? []).map((x: any, i: number) => ({
    id: x.id ?? `${x.type}-${x.target_id ?? 'na'}-${offset + i}`,
    type: x.type,
    target_id: x.target_id ?? null,
    user: x.user,
    text: x.text,
    created: x.created,
    image: x.image ?? null,
  }));

  return {
    items,
    total: data.total ?? items.length,
    limit: data.limit ?? limit,
    offset: data.offset ?? offset,
  };
}
