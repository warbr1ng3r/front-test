import { baseUrl } from '@shared/api';

export async function fetchServerNotifications(limit = 10, offset = 0) {
  const res = await fetch(`${baseUrl}/notifications?limit=${limit}&offset=${offset}`, {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Failed to load notification');
  return res.json();
}
