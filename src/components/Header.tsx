import React from 'react';
import styles from '@/styles/components/Header.module.scss';
import Image from 'next/image';
import Logo from '../../public/images/logo.svg';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <div className={styles.header}>
      <div className={styles.header__left}>
        <Image src={Logo} alt="logo" />
        <p className={styles.header__left__text}>
          Разрабатываем и запускаем
          <br />
          сложные веб проекты
        </p>
      </div>
      <div className={styles.header__right}>
        <Link href="Login">
          <button className={styles.header__right__enter}>
            <p className={styles.header__right__enter__title}>Войти</p>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
