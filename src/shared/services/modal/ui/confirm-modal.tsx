'use client';

import styles from './confirm-modal.module.css';

type Props = {
  title: string;
  description?: string;
  okText?: string;
  cancelText?: string;
  danger?: boolean;
  onOk: () => void;
  onCancel: () => void;
  onClose?: () => void;
};

export function ConfirmModal({
  title,
  description,
  okText = 'Удалить',
  cancelText = 'Отменить',
  danger,
  onOk,
  onCancel,
  onClose,
}: Props) {
  return (
    <div className={styles.modal}>
      <button className={styles.close} aria-label="Закрыть" onClick={onClose}>
        ×
      </button>

      <h3 className={styles.title}>{title}</h3>

      {description && <p className={styles.desc}>{description}</p>}

      <div className={styles.actions}>
        <button className={styles.secondary} onClick={onCancel}>
          {cancelText}
        </button>
        <button className={`${styles.primary} ${danger ? styles.danger : ''}`} onClick={onOk}>
          {okText}
        </button>
      </div>
    </div>
  );
}
