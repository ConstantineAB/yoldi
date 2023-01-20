import React from 'react';
import styles from '@/styles/components/Edit.module.scss';

interface myProps {
  openModal: boolean;
  setOpenModal: Function;
}

const Edit: React.FC<myProps> = ({ openModal, setOpenModal }) => {
  let toggleModal: object = openModal === !false ? { display: 'flex' } : { display: 'none' };

  return (
    <div className={styles.edit} style={toggleModal}>
      <div className={styles.edit__inner}>
        <p className={styles.edit__inner__title}>Редактировать профиль</p>
        <div className={styles.edit__inner__name}>
          <p>Имя</p>
          <input type="text" />
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
          <button className={styles.edit__inner__buttons__save}>
            <p>Сохранить</p>
          </button>
        </div>
      </div>
      <div className={styles.edit__background} onClick={() => setOpenModal(!openModal)}></div>
    </div>
  );
};

export default Edit;
