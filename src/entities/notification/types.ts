export type User = {
  avatar: string;
  name: string;
  username: string;
};
export type FeedItem = {
  id: string;
  target_id: string;
  type: 'comment' | 'like' | 'repost' | 'subscription';
  text: string;
  time: string;
  author: { name: string; username: string; avatar: string };
  grouped?: boolean;
  groupKey?: string;
  image?: string;
  mentions?: { name: string; username: string; avatar: string }[];
};
export type NotificationItem = {
  type: string;
  target_id: string | null;
  user: User;
  text: string;
  created: string;
  image?: string | null;
};
export type GroupedNotification = {
  type: string;
  target_id: string | null;
  user: User;
  text: string;
  created: string;
  image?: string | null;
  users: User[];
  other_count: number;
};
export type NotificationResponse = {
  total: number;
  limit: number;
  offset: number;
  results: (GroupedNotification | NotificationItem)[];
};
