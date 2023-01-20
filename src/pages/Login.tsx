import React from 'react';
import styles from '@/styles/pages/Login.module.scss';
import Image from 'next/image';
import Envelope from '../../public/images/icons/envelope.svg';
import Lock from '../../public/images/icons/lock-solid.svg';
import Eye from '../../public/images/icons/eye-solid.svg';
import Footer from '@/components/Footer';
import { useSWRConfig } from 'swr';
import axios from 'axios';

const Login: React.FC = () => {
  const url: string = 'https://frontend-test-api.yoldi.agency/api/auth/login';
  const { mutate } = useSWRConfig();

  const [email, setEmail]: any = React.useState();
  const [password, setPassword]: any = React.useState();

  const postLogin: Function = async () => {
    mutate(
      axios
        .post(url, {
          email: email,
          password: password,
        })
        .then((res) => {
          console.log(res.data);
          setEmail(''), setPassword('');
        })
        .catch((error) => {
          console.log(error);
        }),
    );
  };

  const login = true;

  return (
    <>
      <div className={styles.login}>
        <div className={styles.login__bar}>
          <p className={styles.login__bar__title}>Вход в Yoldi Agency</p>
          <div className={styles.login__bar__input}>
            <Image src={Envelope} alt="Envelope" />
            <input
              type="text"
              placeholder="E-mail"
              onChange={(e: any) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className={styles.login__bar__input}>
            <Image src={Lock} alt="Lock" />
            <input
              type="text"
              placeholder="Пароль"
              onChange={(e: any) => setPassword(e.target.value)}
              value={password}
            />
            <Image src={Eye} alt="Eye" />
          </div>
          <button className={styles.login__bar__button} onClick={() => postLogin()}>
            <p>Войти</p>
          </button>
        </div>
      </div>
      <Footer login={login} />
    </>
  );
};

export default Login;
