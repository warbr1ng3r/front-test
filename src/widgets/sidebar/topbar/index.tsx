'use client';
import Image from 'next/image';
import { useState } from 'react';

import ProfileImage from '@shared/assets/profile.png';
import { SettingsIcon } from '@shared/icons';
import { AddCircleIcon } from '@shared/icons/add-circle';
import { BurgerIcon } from '@shared/icons/burger';

import { Sidebar } from '../sidebar';

import styles from './Topbar.module.css';

export function Topbar() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <header className={styles.bar}>
        <button className={styles.button} aria-label="Меню" onClick={() => setOpen(true)}>
          <BurgerIcon />
        </button>
        <Image className={styles.avatar} width={40} height={40} src={ProfileImage} alt="" />
        <div className={styles.balance}>
          23,690<span className={styles.badge}>⟲</span>
        </div>
        <div className={styles.spacer} />
        <button className={styles.button} aria-label="Добавить">
          <AddCircleIcon />
        </button>
        <button className={styles.button} aria-label="Настройки">
          <SettingsIcon />︎
        </button>
      </header>
      {open && <Sidebar mobile onClose={() => setOpen(false)} />}
    </>
  );
}
