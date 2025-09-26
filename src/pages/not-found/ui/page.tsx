import Link from 'next/link';

import styles from './page.module.css';

export async function NotFoundPage() {
  return (
    <div className={styles.shell}>
      <h2>Страница не найдена</h2>
      <span>
        К сожалению, это всего лишь страница 404. Возможно, вы ошиблись в адресе или страница была
        перемещена по другому URL
      </span>
      <Link className={styles.link} href="/notification">
        Вернуться на главную
      </Link>
    </div>
  );
}
