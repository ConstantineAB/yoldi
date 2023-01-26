import React from 'react';
import styles from '@/styles/pages/Owner.module.scss';
import Image from 'next/image';
import SignOut from '../../public/images/icons/sign-out-alt-solid.svg';
import Pen from '../../public/images/icons/pen-solid.svg';
import Hover from '../../public/images/state=hover.svg';
import Upload from '../../public/images/icons/upload-solid.svg';
import ImageIcon from '../../public/images/icons/image.svg';
import Trash from '../../public/images/icons/trash-solid.svg';
import Edit from '@/components/Edit';
import useSWR from 'swr';
import { imageUrl, profileUrl } from '@/http';
import axios from 'axios';
import Cookie from 'js-cookie';
import { useRouter } from 'next/router';

const Profile: React.FC = () => {
  const [openModal, setOpenModal] = React.useState(false);

  const fetcher = (url: string) =>
    axios
      .get(url, {
        headers: {
          'x-api-key': Cookie.get('x-api-key'),
        },
      })
      .then((res) => res.data);

  const { data, mutate, error }: any = useSWR(profileUrl, fetcher);

  const email = data?.email;
  const slug = data?.slug;
  const imageId = data?.image;

  // Добавление авы
  const [selectedImage, setSelectedImage]: any = React.useState(null);
  const [uploadedImage, setUploadedImage] = React.useState(null);

  const imagePicker: any = React.useRef(null);

  const handleChangeImage = (e: any) => {
    setSelectedImage(e.target.files[0]);
  };

  const imagePick = () => {
    imagePicker.current.click();
  };

  const handleUpLoadImage = async () => {
    if (!selectedImage) {
      alert('Пожалуйста выберите файл');
    }

    const formData = new FormData();
    formData.append('file', selectedImage);

    await axios(imageUrl, {
      method: 'post',
      data: formData,
      headers: { accept: 'application/json', 'Content-Type': 'multipart/form-data' },
    })
      .then((res: any) => setUploadedImage(res.data.id))
      .catch((error) => console.log(error));
  };

  if (uploadedImage !== null) {
    axios
      .patch(
        profileUrl,
        {
          name: data?.name,
          imageId: uploadedImage,
          password: null,
          slug: data?.slug,
        },
        { headers: { 'x-api-key': Cookie.get('x-api-key') } },
      )
      .then(() => setSelectedImage(null))
      .then(() => mutate())
      .catch((error) => console.log(error));
  }

  // Добавление шапки
  const [selectedCover, setSelectedCover]: any = React.useState(null);
  const [uploadedCover, setUploadedCover] = React.useState(null);

  const coverPicker: any = React.useRef(null);

  const handleChangeCover = (e: any) => {
    setSelectedCover(e.target.files[0]);
  };

  const coverPick = () => {
    coverPicker.current.click();
  };

  const handleUpLoadCover = async () => {
    if (!selectedCover) {
      alert('Пожалуйста выберите файл');
    }

    const formData = new FormData();
    formData.append('file', selectedCover);

    await axios(imageUrl, {
      method: 'post',
      data: formData,
      headers: { accept: 'application/json', 'Content-Type': 'multipart/form-data' },
    })
      .then((res: any) => setUploadedCover(res.data.id))
      .catch((error) => console.log(error));
  };

  if (uploadedCover !== null) {
    axios
      .patch(
        profileUrl,
        {
          name: data?.name,
          password: null,
          slug: data?.slug,
          coverId: uploadedCover,
        },
        { headers: { 'x-api-key': Cookie.get('x-api-key') } },
      )
      .then(() => setSelectedCover(null))
      .then(() => mutate())
      .catch((error) => console.log(error));
  }

  // Удаление шапки
  const deleteCover = async () => {
    axios
      .patch(
        profileUrl,
        {
          name: data?.name,
          imageId: data?.image.id,
          password: null,
          slug: data?.slug,
          coverId: null,
        },
        { headers: { 'x-api-key': Cookie.get('x-api-key') } },
      )
      .then(() => mutate())
      .catch((error) => console.log(error));
  };

  // Выход
  const router: any = useRouter();

  const exit = () => {
    Cookie.set('x-api-key', '0000000'), router.push('/Login');
  };
  const [hoverImage, setHoverImage]: any = React.useState(false);

  let toggleHoverImage: object = hoverImage === !false ? { marginRigth: 0 } : { marginLeft: 102 };

  let toggleSelectedImage: object =
    selectedImage !== null ? { display: 'flex' } : { display: 'none' };

  if (selectedImage !== null) {
    toggleHoverImage = { display: 'none' };
  }

  const [hoverCover, setHoverCover]: any = React.useState(false);

  let toggleHoverCover: object = hoverCover === !false ? { display: 'flex' } : { display: 'none' };

  if (selectedCover !== null) {
    toggleHoverCover = { display: 'none' };
  }

  let toggleSelectedCover: any = selectedCover !== null ? { display: 'flex' } : { display: 'none' };

  if (selectedCover === null) {
    toggleSelectedCover = { display: 'none' };
  }

  return (
    <div className={styles.owner}>
      <div
        className={styles.owner__header}
        onMouseOver={() => setHoverCover(true)}
        onMouseOut={() => setHoverCover(false)}>
        {data?.cover !== null ? (
          <Image
            loader={() => `${data?.cover.url}`}
            src={`${data?.cover.url}`}
            alt="sd"
            width={1300}
            height={200}
          />
        ) : (
          ''
        )}
        <input
          className={styles.hidden}
          onChange={handleChangeCover}
          ref={coverPicker}
          type="file"
          accept="image/*,.png,.jpg,.gif,.webp"
        />
        {selectedCover !== null ? (
          <button
            className={styles.owner__header__select}
            style={toggleSelectedCover}
            onClick={handleUpLoadCover}>
            <p>OK</p>
          </button>
        ) : (
          ''
        )}
        {data?.cover !== null ? (
          <button
            className={styles.owner__header__trash}
            style={toggleHoverCover}
            onClick={deleteCover}>
            <Image src={Trash} alt="Загрузить" />
            <p>Удалить</p>
            <Image src={Upload} alt="Загрузить" />
          </button>
        ) : (
          ''
        )}
        {data?.cover === null ? (
          <button
            className={styles.owner__header__load}
            style={toggleHoverCover}
            onClick={coverPick}>
            <Image src={Upload} alt="Загрузить" />
            <p>Загрузить</p>
            <Image src={ImageIcon} alt="Загрузить" />
          </button>
        ) : (
          ''
        )}
      </div>
      <div className={styles.owner__main}>
        <div
          className={styles.owner__main__avatar}
          onMouseOver={() => setHoverImage(true)}
          onMouseOut={() => setHoverImage(false)}>
          <button className={styles.owner__main__avatar__select} onClick={imagePick}>
            <Image src={Hover} style={toggleHoverImage} alt="hover" />
          </button>
          <input
            className={styles.hidden}
            type="file"
            onChange={handleChangeImage}
            ref={imagePicker}
            accept="image/*,.png,.jpg,.gif,.webp"
          />
          <button
            className={styles.owner__main__avatar__select}
            style={toggleSelectedImage}
            onClick={handleUpLoadImage}>
            <p>Загрузить</p>
          </button>
          {data?.image !== null ? (
            <Image
              loader={() => `${data?.image.url}`}
              src={`${data?.image.url}`}
              alt="sd"
              width={100}
              height={100}
            />
          ) : (
            <p>{data?.name[0]}</p>
          )}
        </div>
        <div className={styles.owner__main__container}>
          <div className={styles.owner__main__container__userdata}>
            <span>{data?.name}</span>
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
        <button className={styles.owner__main__signOut} onClick={() => exit()}>
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
