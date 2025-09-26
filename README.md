## Задеплоенное приложение
[https://front-test-ofans.netlify.app](https://front-test-ofans.netlify.app/notification)

## Для разработчиков

### Архитектурные принципы
- **Feature-Sliced Design (FSD)** поверх **Next.js App Router** и **CSS Modules**.
- Данные вне UI: сетевые вызовы и нормализация в отдельных файлах.
- Чёткая граница **SSR/CSR**: страницы получают первую порцию данных на сервере, виджеты отвечают за интерактив и клиентские дозагрузки (TanStack Query).

### Ключевые единицы
- **NotificationCard** — карточка уведомления: клики по аватару/имени/юзернейму (действие 1), по карточке (действие 2), по «три точки» (действие 3), локальный toggle «Подписаться». Для групп — ссылка «Смотреть все» → `/group/[type]/[targetId]`.
- **NotificationsView** — лента с табами и бесконечной подгрузкой.
- **GroupNotificationsView** — лента конкретной группы (вариант без/с бесконечной подгрузкой), поддерживает `serverFailed`.
- **Сервис модалок** — императивный API (`modal.confirm`, `modal.open`), стек, ESC, подложка.

### Качество кода
- ESLint/Prettier: `pnpm lint`, `pnpm eslint:fix`, `pnpm stylelint:fix`.

---

## Быстрый запуск

```bash
# 1. Установка зависимостей
pnpm i

# 2. Запуск в режиме разработки
pnpm run dev
# открыть http://localhost:3000

# 3. Сборка и запуск продакшна
pnpm run build
pnpm run start

# 4. Проверка и автоисправление
pnpm run lint
pnpm run eslint:fix
pnpm run styleint:fix
```
