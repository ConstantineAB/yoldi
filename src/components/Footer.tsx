import React from 'react';
import styles from '@/styles/components/Footer.module.scss';
import Link from 'next/link';

interface buttonProps {
  login?: boolean;
  registration?: boolean;
}

const Footer: React.FC<buttonProps> = ({ login, registration }) => {
  return (
    <div className={styles.footer}>
      {login ? (
        true
      ) : (
        <div className={styles.footer__wrapper}>
          <p className={styles.footer__wrapper__title}>Уже есть аккаунт?</p>
          <Link href="Login">
            <button className={styles.footer__wrapper__button}>
              <p>Войти</p>
            </button>
          </Link>
        </div>
      )}
      {registration ? (
        true
      ) : (
        <div className={styles.footer__wrapper}>
          <p className={styles.footer__wrapper__title}>Еще нет аккаунта?</p>
          <Link href="Registration">
            <button className={styles.footer__wrapper__button}>
              <p>Зарегистрироваться</p>
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Footer;
