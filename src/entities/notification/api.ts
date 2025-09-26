import { toFeedItem } from '@widgets/notification-view';

type User = {
  online: boolean;
  avatar: string;
  name: string;
  username: string;
  sex: string;
  verified: boolean;
};

export type NotificationItem = {
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

export function toClientFeed(resp: NotificationResponse, injectedOffset = 0) {
  const items = (resp.results ?? []).map((x, i) => toFeedItem(x, i, resp.offset ?? injectedOffset));
  return { items, total: resp.total, limit: resp.limit, offset: resp.offset ?? injectedOffset };
}
