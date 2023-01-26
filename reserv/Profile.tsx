import React from 'react';
import styles from '@/styles/pages/Owner.module.scss';
import Image from 'next/image';
import SignOut from '../../public/images/icons/sign-out-alt-solid.svg';
import Pen from '../../public/images/icons/pen-solid.svg';
import Edit from '@/components/Edit';
import useSWR from 'swr';
import { imageUrl, profileUrl } from '@/http';
import axios from 'axios';
import Cookie from 'js-cookie';

const Profile: React.FC = () => {
  const [openModal, setOpenModal] = React.useState(false);

  const fetcher = axios.create({
    headers: {
      'x-api-key': Cookie.get('x-api-key'),
    },
  });

  // Использовать мемоизацию
  const { data, mutate, error }: any = useSWR(profileUrl, fetcher);

  const email = data?.data.email;
  const slug = data?.data.slug;
  const imageId = data?.data.image;

  const filePicker: any = React.useRef(null);
  const [selectedFile, setSelectedFile]: any = React.useState(null);
  const [uploaded, setUploaded] = React.useState();

  const handleChange = (e: any) => {
    console.log(e.target.files);
    setSelectedFile(e.target.files[0]);
  };

  const handleUpLoad = async () => {
    if (!selectedFile) {
      alert('Пожалуйста выберите файл');
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    axios(imageUrl, {
      method: 'post',
      data: formData,
      headers: { accept: 'application/json', 'Content-Type': 'multipart/form-data' },
    })
      .then((res) => console.log(res.data.id))
      .catch((error) => console.log(error));
  };

  const handlePick = () => {
    filePicker.current.click();
  };

  return (
    <div className={styles.owner}>
      <div className={styles.owner__header}>
        <button onClick={handlePick}>Загрузить</button>
        <input
          className={styles.hidden}
          type="file"
          ref={filePicker}
          onChange={handleChange}
          accept="image/*,.png,.jpg,.gif,.webp"
        />
      </div>
      <button onClick={() => handleUpLoad()}>Upload now!</button>
      <div className={styles.owner__main}>
        <div className={styles.owner__main__avatar}>
          <p>{data?.data.name[0]}</p>
        </div>
        <div className={styles.owner__main__container}>
          <div className={styles.owner__main__container__userdata}>
            <span>{data?.data.name}</span>
            <p>{email}</p>
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
      <Edit
        slug={slug}
        mutate={mutate}
        imageId={imageId?.id}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </div>
  );
};

export default Profile;
