import React from 'react';
import styles from '@/styles/components/Edit.module.scss';
import useSWR from 'swr';
import { profileUrl } from '@/http';
import axios from 'axios';
import Cookie from 'js-cookie';

interface myProps {
  openModal: boolean;
  setOpenModal: Function;
  slug: string;
  imageId: null | object;
  mutate: any;
}

// Сделать patch в Postman

const Edit: React.FC<myProps> = ({ openModal, setOpenModal, slug, imageId, mutate }) => {
  let toggleModal: object = openModal === !false ? { display: 'flex' } : { display: 'none' };

  const [upname, setUpName]: any = React.useState();

  const patchFetcher: any = () =>
    axios
      .patch(profileUrl, {
        data: {
          name: upname,
          password: '142486',
          slug: 'constantine--email.com',
          imageId: null,
        },
      })
      .then((response) => {
        console.log(response);
        () => mutate();
      })
      .catch((error) => {
        console.log(error);
      });

  console.log(
    {
      'x-api-key': Cookie.get('x-api-key'),
    },
    {
      name: upname,
      imageId: null,
      password: '142486',
      slug: slug,
    },
  );

  return (
    <div className={styles.edit} style={toggleModal}>
      <div className={styles.edit__inner}>
        <p className={styles.edit__inner__title}>Редактировать профиль</p>
        <div className={styles.edit__inner__name}>
          <p>Имя</p>
          <input type="text" value={upname} onChange={(e) => setUpName(e.target.value)} />
        </div>
        <div className={styles.edit__inner__address}>
          <p className={styles.edit__inner__address__title}>Адрес профиля</p>
          <div className={styles.edit__inner__address__input}>
            <div className={styles.edit__inner__address__input__example}>
              <p>example.com/</p>
            </div>
            <input type="text" />
          </div>
        </div>
        <div className={styles.edit__inner__description}>
          <p className={styles.edit__inner__description__title}>Описание</p>
          <textarea name="" id="">
            Рыбатекст используется дизайнерами, проектировщиками и фронтендерами, когда нужно быстро
            заполнить макеты или прототипы содержимым. Это тестовый контент, который не должен нести
            никакого смысла, лишь показать наличие самого текста или продемонстрировать типографику
            в деле.
          </textarea>
        </div>
        <div className={styles.edit__inner__buttons}>
          <button
            className={styles.edit__inner__buttons__cancel}
            onClick={() => setOpenModal(!openModal)}>
            <p>Отмена</p>
          </button>
          <button className={styles.edit__inner__buttons__save} onClick={patchFetcher}>
            <p>Сохранить</p>
          </button>
        </div>
      </div>
      <div className={styles.edit__background} onClick={() => setOpenModal(!openModal)}></div>
    </div>
  );
};

export default Edit;
