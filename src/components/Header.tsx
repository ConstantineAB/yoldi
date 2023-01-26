import React from 'react';
import styles from '@/styles/components/Header.module.scss';
import Image from 'next/image';
import Logo from '../../public/images/logo.svg';
import Link from 'next/link';
import useSWR from 'swr';
import { profileUrl } from '@/http';
import axios from 'axios';
import Cookie from 'js-cookie';

const Header: React.FC = () => {
  const fetcher = (url: string) =>
    axios
      .get(url, {
        headers: {
          'x-api-key': Cookie.get('x-api-key'),
        },
      })
      .then((res) => res.data);

  const { data, error }: any = useSWR(profileUrl, fetcher);

  return (
    <div className={styles.header}>
      <div className={styles.header__left}>
        <Link href="/">
          <Image src={Logo} alt="logo" />
        </Link>
        <p className={styles.header__left__text}>
          Разрабатываем и запускаем
          <br />
          сложные веб проекты
        </p>
      </div>
      <div className={styles.header__right}>
        {error ? (
          <Link href="/Login">
            <button className={styles.header__right__enter}>
              <p className={styles.header__right__enter__title}>Войти</p>
            </button>
          </Link>
        ) : (
          ''
        )}
        {error ? (
          ''
        ) : (
          <Link href="/Profile">
            <button className={styles.header__right__logged}>
              <p className={styles.header__right__logged__title}>{data?.name}</p>
              <div className={styles.header__right__logged__icon}>
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
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
