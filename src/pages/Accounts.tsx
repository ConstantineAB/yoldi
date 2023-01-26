import React from 'react';
import styles from '@/styles/pages/Accounts.module.scss';
import Account from '@/components/Account';
import useSWR from 'swr';
import axios from 'axios';
import { userUrl } from '@/http';

const Accounts: React.FC = () => {
  const fetcher = (url: string) => axios.get(url).then((res) => res.data);
  const { data, error } = useSWR(userUrl, fetcher);

  return (
    <div className={styles.accounts}>
      <p className={styles.accounts__title}>Список аккаунтов</p>
      <div className={styles.accounts__list}>
        {data?.map((obj: any) => (
          <Account {...obj} key={obj.id} />
        ))}
      </div>
    </div>
  );
};

export default Accounts;
