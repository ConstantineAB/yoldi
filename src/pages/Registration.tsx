import React from 'react';
import styles from '@/styles/pages/Registration.module.scss';
import Image from 'next/image';
import User from '../../public/images/icons/user.svg';
import Envelope from '../../public/images/icons/envelope.svg';
import Lock from '../../public/images/icons/lock-solid.svg';
import Eye from '../../public/images/icons/eye-solid.svg';
import Footer from '@/components/Footer';
import { useSWRConfig } from 'swr';
import axios from 'axios';

const Registration: React.FC = () => {
  const url: string = 'https://frontend-test-api.yoldi.agency/api/auth/sign-up';
  const { mutate } = useSWRConfig();

  const [email, setEmail]: any = React.useState();
  const [name, setName]: any = React.useState();
  const [password, setPassword]: any = React.useState();

  const postRegistration: Function = () => {
    mutate(
      axios
        .post(url, {
          email: email,
          name: name,
          password: password,
        })
        .then((res) => {
          console.log(res);
          setEmail(''), setName(''), setPassword('');
        })
        .catch((error) => {
          console.log(error);
        }),
    );
  };

  const registration = true;

  return (
    <>
      <div className={styles.registration}>
        <div className={styles.registration__bar}>
          <p className={styles.registration__bar__title}>
            Регистрация
            <br />
            в Yoldi Agency
          </p>
          <div className={styles.registration__bar__input}>
            <Image src={User} alt="Name" />
            <input
              type="text"
              placeholder="Имя"
              onChange={(e: any) => setName(e.target.value)}
              value={name}
            />
          </div>
          <div className={styles.registration__bar__input}>
            <Image src={Envelope} alt="Envelope" />
            <input
              type="text"
              placeholder="E-mail"
              onChange={(e: any) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className={styles.registration__bar__input}>
            <Image src={Lock} alt="Lock" />
            <input
              type="text"
              placeholder="Пароль"
              onChange={(e: any) => setPassword(e.target.value)}
              value={password}
            />
            <Image src={Eye} alt="Eye" />
          </div>
          <button className={styles.registration__bar__button} onClick={() => postRegistration()}>
            <p>Создать аккаунт</p>
          </button>
        </div>
      </div>
      <Footer registration={registration} />
    </>
  );
};

export default Registration;
