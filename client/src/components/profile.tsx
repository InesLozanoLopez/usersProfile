import React, { useEffect, useState } from "react";
import { IUserInfo } from "../interfaces";
import { useLocation, useNavigate } from "react-router-dom";
import { logout } from "../services/auth.services";
import { useFormik } from "formik";
import { updateUserInfo } from "../services/userProfile.services";
import { profileIconsList } from "./profileIconsList";
import './../styles/Profile.css';

const Profile: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [profilePhotoVisible, setProfilePhotoVisible] = useState<boolean>(false)

    const userId = location.state?.user.user.usersRegistration_id;

    const formik = useFormik({
        initialValues: {
            house: '',
            photo: '',
            admin: false,
        },
        onSubmit: async (values: IUserInfo) => {
            await updateUserInfo({ values, userId })
        }
    })

    useEffect(() => {
        const fetchData = async () => {
            const user = await location.state?.user.user;

            if (user) {
                formik.setValues({
                    house: user.house || 'Not added yet',
                    photo: user.photo || 'ostrich',
                    admin: user.admin || false,
                });

            } else {
                navigate('/login');
            }
        };
        fetchData();
    }, []);

    const handleLogOut = () => {
        logout();
        navigate('/login');
    }

    const handleChangeProfilePhoto = () => {
        setProfilePhotoVisible(!profilePhotoVisible);
    }
    const handleSelectProfilePhoto = (selectedPhoto: string) => {
        formik.setValues({
            ...formik.values,
            photo: selectedPhoto,
        })
        setProfilePhotoVisible(!profilePhotoVisible);


    }

    return (
        <>
            <section id='profilePhotoSection'>
                <img
                    src={`/iconsProfile/${formik.values.photo}.png`}
                    alt='Photo perfil'
                    aria-label="Perfil photo"
                    className='profilePhoto'>
                </img>

                <button onClick={(event) => {
                    event.preventDefault();
                    handleChangeProfilePhoto();
                }}
                    className="button"
                    aria-label="Button to change profile photo"
                >Change profile photo</button>
                {profilePhotoVisible && (
                    <div className="alternativePhotosContainer">
                        {profileIconsList.filter((fileName) => fileName !== formik.values.photo)
                            .map((fileName: string, index: number) => (
                                <img key={index}
                                    src={`/iconsProfile/${fileName}.png`}
                                    alt='Photo perfil'
                                    className='profilePhoto'
                                    aria-label="Alternative profile photos"
                                    onClick={() => handleSelectProfilePhoto(fileName)}>
                                </img>
                            ))}
                    </div>
                )}
            </section>
            <section id='form'>
                <form onSubmit={formik.handleSubmit}>
                    <div>
                        <label htmlFor="house">House: </label>
                    </div>
                    <div>
                        <input
                            type="text"
                            id="house"
                            name='house'
                            value={formik.values.house}
                            className="formInput"
                            aria-label="House name"
                            onChange={formik.handleChange} />
                    </div>
                    <div>
                        <label htmlFor="admin">Are you the admin of the house?</label>
                    </div>
                    <div>
                        <input
                            type='checkbox'
                            id="admin"
                            name='admin'
                            checked={formik.values.admin}
                            onChange={(e) => {
                                formik.setValues({
                                    ...formik.values,
                                    admin: e.target.checked
                                });
                            }}
                        />
                    </div>
                    <button type="submit">Submit</button>
                </form >
            </section>

            <button onClick={handleLogOut}>Log out</button>

        </>

    )
}

export default Profile;