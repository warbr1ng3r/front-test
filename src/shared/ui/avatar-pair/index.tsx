'use client';

import Image from 'next/image';

import styles from './avatar-pair.module.css';

type Props = {
  src: [string, string];
  alt?: [string?, string?];
  className?: string;
  onClick?: (e: any) => void;
  onError?: (e: any) => void;
};

export function AvatarPair({ src, alt, className, onClick }: Props) {
  return (
    <div className={`${styles.wrap} ${className ?? ''}`} onClick={onClick}>
      <div className={`${styles.item} ${styles.first}`}>
        <Image width={28} height={28} src={src[0]} alt={alt?.[0] ?? 'avatar'} loading="lazy" />
      </div>
      <div className={`${styles.item} ${styles.second}`}>
        <Image width={28} height={28} src={src[1]} alt={alt?.[1] ?? 'avatar'} loading="lazy" />
      </div>
    </div>
  );
}
