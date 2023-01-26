import React from 'react';
import styles from '@/styles/pages/Registration.module.scss';
import Image from 'next/image';
import User from '../../public/images/icons/user.svg';
import Envelope from '../../public/images/icons/envelope.svg';
import Lock from '../../public/images/icons/lock-solid.svg';
import Eye from '../../public/images/icons/eye-solid.svg';
import GreyEye from '../../public/images/icons/grey-eye-solid.svg';
import Footer from '@/components/Footer';
import { useSWRConfig } from 'swr';
import axios from 'axios';
import { signUpUrl } from '@/http';
import Cookie from 'js-cookie';
import { useRouter } from 'next/router';

const Registration: React.FC = () => {
  const { mutate } = useSWRConfig();

  const [email, setEmail]: any = React.useState();
  const [name, setName]: any = React.useState();
  const [password, setPassword]: any = React.useState();

  const [authorized, setAuthorized]: any = React.useState(false);

  const router: any = useRouter();

  const postRegistration: Function = async () => {
    await mutate(
      axios
        .post(signUpUrl, {
          email: email,
          name: name,
          password: password,
        })
        .then((res) => {
          Cookie.set('x-api-key', `${res.data.value}`);
          setEmail(''), setName(''), setPassword('');
          setAuthorized(!authorized);
        })
        .catch((error) => {
          console.log(error);
        }),
    );
  };

  if (authorized === true) {
    router.push('/Profile');
  }

  const registration = true;

  const [passwordOpen, setPasswordOpen]: any = React.useState(true);
  let toggleType: any = passwordOpen === true ? 'password' : 'text';
  
  let toggleButton = name && email && password !== '' ? { backgroundColor: '#000', color: '#fff' } : {};


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
              type={toggleType}
              placeholder="Пароль"
              onChange={(e: any) => setPassword(e.target.value)}
              value={password}
            />
            <button onClick={() => setPasswordOpen(!passwordOpen)}>
              {passwordOpen === false ? (
                <Image src={Eye} alt="Eye" />
              ) : (
                <Image src={GreyEye} alt="GreyEye" />
              )}
            </button>
          </div>
          <button
            className={styles.registration__bar__button}
            style={toggleButton}
            onClick={() => postRegistration()}>
            <p>Создать аккаунт</p>
          </button>
        </div>
      </div>
      <Footer registration={registration} />
    </>
  );
};

export default Registration;

