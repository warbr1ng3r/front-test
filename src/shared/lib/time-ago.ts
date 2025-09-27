export function timeAgo(input: string): string {
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
