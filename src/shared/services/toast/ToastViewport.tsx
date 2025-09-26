'use client';
import styles from './toast.module.css';
import { useToast } from './ToastContext';
export function ToastViewport() {
  const { toasts, remove } = useToast();
  return (
    <div className={styles.viewport}>
      {toasts.map((t) => (
        <div key={t.id} className={styles.toast} onClick={() => remove(t.id)}>
          {t.message}
        </div>
      ))}
    </div>
  );
}
