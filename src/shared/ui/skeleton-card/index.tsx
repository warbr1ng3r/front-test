export function SkeletonCard() {
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--line)' }} />
      <div style={{ flex: 1 }}>
        <div
          style={{
            height: 12,
            background: 'var(--line)',
            borderRadius: 6,
            width: '60%',
            marginBottom: 8,
          }}
        />
        <div style={{ height: 12, background: 'var(--line)', borderRadius: 6, width: '80%' }} />
      </div>
    </div>
  );
}
