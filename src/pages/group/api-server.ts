export async function fetchServerGroup({
  notif_type,
  target_id,
  limit,
  offest,
}: {
  notif_type: string;
  target_id: string;
  limit: number;
  offest: number;
}) {
  const base = 'https://test-api.krascatalog.ru';
  const res = await fetch(
    `${base}/notifications/group/${notif_type}/${target_id}?limit=${limit}&offset=${offest}`,
    {
      cache: 'no-store',
    },
  );
  if (!res.ok) throw new Error('Failed to load notification');
  return res.json();
}
