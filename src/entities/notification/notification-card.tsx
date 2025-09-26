'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Fragment, useState } from 'react';

import { DotsIcon } from '@shared/icons/dots';
import { useToast } from '@shared/services/toast';
import { AvatarPair } from '@shared/ui/avatar-pair';

import styles from './notification-card.module.css';

export type FeedItem = {
  id: string;
  target_id: string;
  type: 'comment' | 'like' | 'repost' | 'subscription';
  text: string;
  time: string;
  author: { name: string; username: string; avatar: string };
  grouped?: boolean;
  groupKey?: string;
  image?: string;
  mentions?: { name: string; username: string; avatar: string }[];
};

export function NotificationCard({ item }: { item: FeedItem }) {
  const { push } = useToast();
  const [subscribed, setSubscribed] = useState(false);
  function action(kind: number) {
    push(`Действие ${kind}: ${item.author.name}`);
  }
  const router = useRouter();

  return (
    <article
      className={styles.card}
      onClick={(e) => {
        if (!(e.target as HTMLElement).closest('a,button')) action(2);
        if (item.mentions && item.mentions.length > 1)
          router.push(`/group/${item.type}/${item.target_id}`);
      }}
    >
      <span className={styles.avatarWrap} onClick={(e) => e.preventDefault()}>
        {item.mentions && item.mentions.length > 1 ? (
          <AvatarPair
            onError={(e) => {
              (e.target as HTMLImageElement).src = '';
            }}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              action(1);
            }}
            src={[item.mentions[0].avatar, item.mentions[1].avatar]}
          />
        ) : (
          <Image
            width={40}
            height={40}
            src={item.author.avatar}
            alt=""
            className={styles.avatar}
            onError={(e) => {
              (e.target as HTMLImageElement).src = '';
            }}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              action(1);
            }}
          />
        )}
      </span>
      <div className={styles.content}>
        <div className={styles.line}>
          <a
            href="#"
            className={styles.name}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              action(1);
            }}
          >
            {item.author.name}
          </a>
          <span className={styles.msg}>{item.text}</span>
          {item.mentions && item.mentions.length > 0 && (
            <span className={styles.mentions}>
              {' — '}
              {item.mentions.map((u, idx) => (
                <Fragment key={`${u.username}-${idx}`}>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      action(1);
                    }}
                  >
                    @{u.name}
                  </a>
                  {idx < Number(item.mentions?.length) - 1 && ', '}
                </Fragment>
              ))}
            </span>
          )}
        </div>
        <div className={styles.time}>{item.time}</div>
      </div>
      <div className={styles.right}>
        {item.type === 'subscription' ? (
          <button
            className={styles.sub}
            onClick={(e) => {
              e.stopPropagation();
              setSubscribed((s) => !s);
            }}
          >
            {subscribed ? 'Подписан' : 'Подписаться'}
          </button>
        ) : (
          <div className={styles.thumb} aria-hidden>
            {item.image ? <img src={item.image} alt="" /> : null}
          </div>
        )}
        <button
          className={styles.dots}
          onClick={(e) => {
            e.stopPropagation();
            action(3);
          }}
        >
          <DotsIcon />
        </button>
      </div>
    </article>
  );
}
