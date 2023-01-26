import React from 'react';
import styles from '@/styles/components/Account.module.scss';
import Router from 'next/router';
import Image from 'next/image';

interface dataProps {
  email: string;
  image: any;
  name: string;
  slug: string;
}

const Account: React.FC<dataProps> = ({ email, image, name, slug }) => {
  const sendProps = () => {
    Router.push({
      pathname: '/User',
      query: {
        slug,
      },
    });
  };

  return (
    <div className={styles.account} onClick={() => sendProps()}>
      <div className={styles.account__icon}>
        {image !== null ? (
          <Image
            loader={() => `${image.url}`}
            src={`${image.url}`}
            alt="sd"
            width={100}
            height={100}
          />
        ) : (
          <p>{name[0]}</p>
        )}
      </div>
      <div className={styles.account__container}>
        <p className={styles.account__container__title}>{name}</p>
        <p className={styles.account__container__email}>{email}</p>
      </div>
    </div>
  );
};

export default Account;
