'use client';
import Image from 'next/image';
import { FC, useEffect } from 'react';

import ProfileImage from '@shared/assets/profile.png';
import { SettingsIcon, SSIcon } from '@shared/icons';
import { ThemeSwitch } from '@shared/ui/theme-switch';

import {
  HomeIcon,
  MarketingIcon,
  MessagesIcon,
  NotificationIcon,
  ProfileIcon,
  ScheduleIcon,
  ShopIcon,
  SubscribersIcon,
  WalletIcon,
} from './icons';
import styles from './sidebar.module.css';

type Props = { mobile?: boolean; onClose?: () => void };
const items: [string, FC, number?][] = [
  ['Лента', HomeIcon],
  ['Сообщения', MessagesIcon, 5432],
  ['Уведомления', NotificationIcon, 98],
  ['Подписчики', SubscribersIcon, 12],
  ['Магазин', ShopIcon, 3],
  ['Мой баланс', WalletIcon],
  ['Маркетинг', MarketingIcon],
  ['График работ', ScheduleIcon],
  ['Профиль', ProfileIcon],
];

export function Sidebar({ mobile = false, onClose }: Props) {
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobile && onClose) onClose();
    };
    document.addEventListener('keydown', onEsc);
    return () => document.removeEventListener('keydown', onEsc);
  }, [mobile, onClose]);

  const nav = (
    <nav className={mobile ? styles.navMobile : styles.nav}>
      <div className={styles.profile}>
        <Image className={styles.avatar} width={40} height={40} src={ProfileImage} alt="" />

        <div className={styles.balance}>
          <span className={styles.balanceNum}>560,000,690</span>
          <SSIcon />
        </div>
        <button className={styles.settings} aria-label="Настройки">
          <SettingsIcon />
        </button>
      </div>
      <ul className={styles.menu}>
        {items.map(([label, Icon, badge], i) => (
          <li key={i} className={styles.item}>
            <Icon />
            <span className={styles.label}>{label}</span>
            {typeof badge === 'number' && <span className={styles.counter}>{badge}</span>}
          </li>
        ))}
      </ul>
      <button className={styles.live}>Начать Live</button>
      <ThemeSwitch />
    </nav>
  );

  if (!mobile) return nav;

  return (
    <div className={styles.drawerBackdrop} onClick={onClose}>
      <div className={styles.drawer} onClick={(e) => e.stopPropagation()}>
        {nav}
      </div>
    </div>
  );
}
