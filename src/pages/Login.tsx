import React from 'react';
import styles from '@/styles/pages/Login.module.scss';
import Image from 'next/image';
import Envelope from '../../public/images/icons/envelope.svg';
import Lock from '../../public/images/icons/lock-solid.svg';
import Eye from '../../public/images/icons/eye-solid.svg';
import GreyEye from '../../public/images/icons/grey-eye-solid.svg';
import Footer from '@/components/Footer';
import { useSWRConfig } from 'swr';
import axios from 'axios';
import { loginUrl } from '@/http';
import Cookie from 'js-cookie';
import { useRouter } from 'next/router';

const Login = () => {
  const { mutate } = useSWRConfig();

  const router: any = useRouter();

  const [email, setEmail]: any = React.useState();
  const [password, setPassword]: any = React.useState();
  const [authorized, setAuthorized]: any = React.useState(false);

  const postLogin: Function = async () => {
    await mutate(
      axios
        .post(loginUrl, {
          email: email,
          password: password,
        })
        .then((res) => {
          Cookie.set('x-api-key', res.data.value);
        })
        .then(setEmail(''), setPassword(''))
        .then(setAuthorized(!authorized))
        .catch((error) => {
          console.log(error);
        }),
    );
  };

  if (authorized === true) {
    router.push('/Profile');
  }

  const login = true;

  const [passwordOpen, setPasswordOpen]: any = React.useState(true);
  let toggleType: any = passwordOpen === true ? 'password' : 'text';

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
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className={styles.login__bar__input}>
            <Image src={Lock} alt="Lock" />
            <input
              type={toggleType}
              placeholder="Пароль"
              onChange={(e) => setPassword(e.target.value)}
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
            className={styles.login__bar__button}
            style={
              email !== '' && password !== '' ? { backgroundColor: '#000', color: '#fff' } : {}
            }
            onClick={() => postLogin()}>
            <p>Войти</p>
          </button>
        </div>
      </div>
      <Footer login={login} />
    </>
  );
};

export default Login;
