import { ReactNode } from 'react';

import { QueryProvider } from '@shared/providers/query-provider';
import { ThemeProvider } from '@shared/providers/theme-provider';
import { ModalProvider } from '@shared/services/modal';
import { ToastProvider, ToastViewport } from '@shared/services/toast';

import '@shared/styles/globals.css';

export const metadata = {
  title: 'Notifications – Test App',
  description: 'Next.js App Router test task',
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <QueryProvider>
          <ThemeProvider>
            <ToastProvider>
              {children}
              <ToastViewport />
              <ModalProvider />
            </ToastProvider>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
