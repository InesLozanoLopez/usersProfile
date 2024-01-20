import { FormikProps } from 'formik';
import React, { useState } from 'react';
import { IUserInfo } from '../../../interfaces';
import { profileIconsList } from '../profileIconsList';

const ProfilePhoto: React.FC<{ formik: FormikProps<IUserInfo> }> = ({
  formik,
}) => {
  const [profilePhotoVisible, setProfilePhotoVisible] =
    useState<boolean>(false);

  const handleChangeProfilePhoto = () => {
    setProfilePhotoVisible(!profilePhotoVisible);
  };

  const handleSelectProfilePhoto = (selectedPhoto: string) => {
    formik.setValues({
      ...formik.values,
      photo: selectedPhoto,
    });
    setProfilePhotoVisible(!profilePhotoVisible);
  };

  return (
    <>
      <img
        src={`/iconsProfile/${formik.values.photo}.png`}
        alt="Photo perfil"
        aria-label="Perfil photo"
        className="profilePhoto"
      ></img>

      <button
        onClick={() => {
          handleChangeProfilePhoto();
        }}
        className="button"
        aria-label="Button to change profile photo"
      >
        Change profile photo
      </button>

      {profilePhotoVisible && (
        <div className="alternativePhotosContainer">
          {profileIconsList
            .filter((fileName) => fileName !== formik.values.photo)
            .map((fileName: string, index: number) => (
              <img
                key={index}
                src={`/iconsProfile/${fileName}.png`}
                alt="Photo perfil"
                className="profilePhoto"
                aria-label="Alternative profile photos"
                onClick={() => handleSelectProfilePhoto(fileName)}
              ></img>
            ))}
        </div>
      )}
    </>
  );
};

export default ProfilePhoto;
