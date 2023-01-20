import React from 'react';
import styles from '@/styles/pages/Owner.module.scss';
import Image from 'next/image';
import SignOut from '../../public/images/icons/sign-out-alt-solid.svg';
import Pen from '../../public/images/icons/pen-solid.svg';
import Edit from '@/components/Edit';
import { useSWRConfig } from 'swr';
import axios from 'axios';

const Profile: React.FC = () => {

  const [openModal, setOpenModal] = React.useState(false);

  return (
    <div className={styles.owner}>
      <div className={styles.owner__header}></div>
      <div className={styles.owner__main}>
        <div className={styles.owner__main__avatar}>
          <p>В</p>
        </div>
        <div className={styles.owner__main__container}>
          <div className={styles.owner__main__container__userdata}>
            <span>Владислав</span>
            <p>example@gmail.com</p>
          </div>
          <button onClick={() => setOpenModal(!openModal)}>
            <Image src={Pen} alt="Pen" />
            <p>Редактировать</p>
          </button>
        </div>
        <p className={styles.owner__main__description}>
          Рыбатекст используется дизайнерами, проектировщиками и фронтендерами, когда нужно быстро
          заполнить макеты или прототипы содержимым. Это тестовый контент, который не должен нести
          никакого смысла, лишь показать наличие самого текста или продемонстрировать типографику в
          деле.
        </p>
        <button className={styles.owner__main__signOut}>
          <Image src={SignOut} alt="SignOut" />
          <p>Выйти</p>
        </button>
      </div>
      <Edit openModal={openModal} setOpenModal={setOpenModal} />
    </div>
  );
};

export default Profile;
