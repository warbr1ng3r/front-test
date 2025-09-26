'use client';

import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';

import { onModal } from './lib/bus';
import type { ModalDescriptor } from './lib/types';
import { ConfirmModal } from './ui/confirm-modal';
import styles from './modal-root.module.css';

export function ModalProvider() {
  const [stack, setStack] = useState<ModalDescriptor[]>([]);
  const [mounted, setMounted] = useState(false);

  // mount flag для портала
  useEffect(() => setMounted(true), []);

  // события открытия/закрытия
  useEffect(() => {
    return onModal((e) => {
      if (e.type === 'open') setStack((s) => [...s, e.payload]);
      if (e.type === 'close')
        setStack((s) => (e.id ? s.filter((m) => m.id !== e.id) : s.slice(0, -1)));
      if (e.type === 'clear') setStack([]);
    });
  }, []);

  // блокируем прокрутку при наличии модалки
  useEffect(() => {
    if (stack.length === 0) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [stack.length]);

  // ESC закрывает верхнюю модалку, если она dismissible
  useEffect(() => {
    if (stack.length === 0) return;
    const top = stack[stack.length - 1];
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (top.kind === 'confirm') top.resolve(false);
        setStack((s) => s.slice(0, -1));
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [stack]);

  const portal = useMemo(() => (mounted ? document.body : null), [mounted]);
  if (!portal) return null;

  return createPortal(
    <>
      {stack.map((m, i) => {
        const isTop = i === stack.length - 1;
        const close = () => {
          if (m.kind === 'confirm') m.resolve(false);
          setStack((s) => s.filter((x) => x.id !== m.id));
        };
        const onScrim = () => {
          const dismissible =
            m.kind === 'confirm' ? m.props.dismissible !== false : m.dismissible !== false;
          if (isTop && dismissible) close();
        };

        return (
          <div key={m.id} className={styles.layer} aria-hidden={!isTop}>
            <div className={styles.scrim} onClick={onScrim} />
            <div className={styles.box} role="dialog" aria-modal="true">
              {m.kind === 'confirm' ? (
                <ConfirmModal
                  {...m.props}
                  onCancel={() => {
                    m.resolve(false);
                    setStack((s) => s.filter((x) => x.id !== m.id));
                  }}
                  onOk={() => {
                    m.resolve(true);
                    setStack((s) => s.filter((x) => x.id !== m.id));
                  }}
                  onClose={close}
                />
              ) : (
                m.render({ close })
              )}
            </div>
          </div>
        );
      })}
    </>,
    portal,
  );
}
