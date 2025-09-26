// src/shared/lib/modal/bus.ts
'use client';

import { ModalDescriptor } from './types';

type ModalEvent =
  | { type: 'open'; payload: ModalDescriptor }
  | { type: 'close'; id?: string }
  | { type: 'clear' };

const listeners = new Set<(e: ModalEvent) => void>();

export function onModal(cb: (e: ModalEvent) => void): () => void {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

export function emitModal(e: ModalEvent) {
  listeners.forEach((l) => l(e));
}
export const uid = () => Math.random().toString(36).slice(2);
