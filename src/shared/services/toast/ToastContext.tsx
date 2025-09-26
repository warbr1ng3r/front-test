'use client';
import { createContext, ReactNode, useContext, useState } from 'react';
export type Toast = { id: string; message: string };

const Ctx = createContext<{
  toasts: Toast[];
  push: (m: string) => void;
  remove: (id: string) => void;
} | null>(null);

export function useToast() {
  const c = useContext(Ctx);
  if (!c) throw new Error('ToastContext');
  return c;
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const push = (message: string) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((t) => [...t, { id, message }]);
    setTimeout(() => remove(id), 2000);
  };
  const remove = (id: string) => setToasts((t) => t.filter((x) => x.id !== id));
  return <Ctx.Provider value={{ toasts: toasts, push, remove }}>{children}</Ctx.Provider>;
}
