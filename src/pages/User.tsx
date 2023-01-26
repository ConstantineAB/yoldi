import React from 'react';
import { userUrl } from '@/http';
import styles from '@/styles/pages/Owner.module.scss';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import useSWR from 'swr';

const User: React.FC = () => {
  const router = useRouter();

  const {
    query: { slug },
  } = router;

  const props: any = {
    slug,
  };
  const fetcher = (url: string) => axios.get(url).then((res) => res.data);
  const { data, error } = useSWR(`${userUrl}/${slug}`, fetcher);

  return (
    <div className={styles.owner}>
      <div className={styles.owner__header}>
        {data?.cover !== null ? (
          <Image
            loader={() => `${data?.cover.url}`}
            src={`${data?.cover.url}`}
            alt="sd"
            width={1300}
            height={200}
          />
        ) : (
          ''
        )}
      </div>
      <div className={styles.owner__main}>
        <div className={styles.owner__main__avatar}>
          {data?.image !== null ? (
            <Image
              loader={() => `${data?.image.url}`}
              src={`${data?.image.url}`}
              alt="sd"
              width={100}
              height={100}
            />
          ) : (
            <p>{data?.name[0]}</p>
          )}
        </div>
        <div className={styles.owner__main__container}>
          <div className={styles.owner__main__container__userdata}>
            <span>{data?.name}</span>
            <p>{data?.email}</p>
          </div>
        </div>
        <p className={styles.owner__main__description}>
          Рыбатекст используется дизайнерами, проектировщиками и фронтендерами, когда нужно быстро
          заполнить макеты или прототипы содержимым. Это тестовый контент, который не должен нести
          никакого смысла, лишь показать наличие самого текста или продемонстрировать типографику в
          деле.
        </p>
      </div>
    </div>
  );
};

export default User;
