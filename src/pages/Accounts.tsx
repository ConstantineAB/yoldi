import React from 'react';
import styles from '@/styles/pages/Accounts.module.scss';
import Account from '@/components/Account';
import useSWR from 'swr';
import axios from 'axios';

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const Accounts: React.FC = () => {
  const { data, error } = useSWR('https://frontend-test-api.yoldi.agency/api/user', fetcher);
  console.log(data);

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
