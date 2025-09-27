import { toFeedItem } from '@widgets/notification-view';

import { NotificationResponse } from './types';

export function toClientFeed(resp: NotificationResponse, injectedOffset = 0) {
  const items = (resp.results ?? []).map((x, i) => toFeedItem(x, i, resp.offset ?? injectedOffset));
  return { items, total: resp.total, limit: resp.limit, offset: resp.offset ?? injectedOffset };
}
