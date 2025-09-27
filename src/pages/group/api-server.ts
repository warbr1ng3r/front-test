import { baseUrl } from '@shared/api';

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
  const res = await fetch(
    `${baseUrl}/notifications/group/${notif_type}/${target_id}?limit=${limit}&offset=${offest}`,
    {
      cache: 'no-store',
    },
  );
  if (!res.ok) throw new Error('Failed to load notification');
  return res.json();
}
