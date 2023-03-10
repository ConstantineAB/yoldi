import React from 'react';
import styles from '@/styles/components/Edit.module.scss';
import useSWR, { mutate } from 'swr';
import { profileUrl } from '@/http';
import axios from 'axios';
import Cookie from 'js-cookie';

interface myProps {
  openModal: boolean;
  setOpenModal: Function;
  slug: string;
  imageId: null | object;
  mutate: Function;
}

const Edit: React.FC<myProps> = ({ openModal, setOpenModal, slug, mutate }) => {
  let toggleModal: object = openModal === !false ? { display: 'flex' } : { display: 'none' };

  const [name, setName]: any = React.useState();

  const patchFetcher: any = () =>
    axios
      .patch(
        profileUrl,
        {
          name: name,
          slug: slug,
        },
        {
          headers: {
            'x-api-key': Cookie.get('x-api-key'),
          },
        },
      )
      .then(() => mutate())
      .then(setOpenModal(!openModal))
      .catch((error) => {
        console.log(error);
      });

  return (
    <div className={styles.edit} style={toggleModal}>
      <div className={styles.edit__inner}>
        <p className={styles.edit__inner__title}>Редактировать профиль</p>
        <div className={styles.edit__inner__name}>
          <p>Имя</p>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
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
