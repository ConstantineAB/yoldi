import React from 'react';
import styles from '@/styles/components/Account.module.scss';

interface dataProps {
  email: string;
  image: any;
  name: string;
  slug: string;
}

const Account: React.FC<dataProps> = ({ email, image, name, slug }) => {
  return (
    <div className={styles.account}>
      <div className={styles.account__icon}>
        <p>Е</p>
      </div>
      <p className={styles.account__title}>{name}</p>
      <p className={styles.account__email}>{email}</p>
    </div>
  );
};

export default Account;
