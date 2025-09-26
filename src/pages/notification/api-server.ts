export async function fetchServerNotifications(limit = 10, offset = 0) {
  const base = 'https://test-api.krascatalog.ru';
  const res = await fetch(`${base}/notifications?limit=${limit}&offset=${offset}`, {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Failed to load notification');
  return res.json();
}
