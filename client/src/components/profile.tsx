import React, { useEffect, useState } from "react";
import { ILogin, IUserInfo } from "../interfaces";
import { useLocation, useNavigate } from "react-router-dom";
import { logout } from "../services/auth.services";
import { useFormik } from "formik";
import { updateUserInfo } from "../services/userProfile.services";
import { profileIconsList } from "./profileIconsList";
import './../styles/Profile.css';

const Profile: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [profilePhotoVisible, setProfilePhotoVisible] = useState<boolean>(false);
    const [showConfirmationMessage, setShowConfirmationMessage] = useState<boolean>(false);
    const userId = location.state?.user.user.usersRegistration_id;

    const formik = useFormik({
        initialValues: {
            house: '',
            photo: '',
            admin: false,
            email: '',
            name: '',
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
                    email: user.email,
                    name: user.name,
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

    const confirmDeleteHouse = () => {
        formik.setValues({
            ...formik.values,
            house: 'Not added yet'
        })
        setShowConfirmationMessage(!showConfirmationMessage)
    }

    const handleDeleteHouse = () => {
        setShowConfirmationMessage(!showConfirmationMessage);
    }

    const handleAddHouse = async () => {
        await formik.submitForm();
        navigate('/house-profile');
    }

    return (
        <>
            <section id='profilePhoto'>
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
                    <div className='userDetailsContainer'>
                        <input
                            type="text"
                            id="name"
                            name='name'
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            className="formInput"
                            aria-label="Your Name"
                        />
                        <input
                            type="text"
                            id="email"
                            name='email'
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            className="formInput"
                            aria-label="Your Email"
                        />
                    </div>

                    <div className='houseContainer'>
                        House:
                        <input
                            type="text"
                            id="house"
                            name='house'
                            value={formik.values.house}
                            className="formInput"
                            aria-label="House name"
                            readOnly
                        />
                        <button
                            type="submit"
                            className="button"
                            aria-label='To delete your profile on that house'
                            onClick={handleDeleteHouse}>
                            I live somewhere else</button>
                    </div>

                    {showConfirmationMessage && (
                        <div className="confirmationMessage">
                            <p>Are you sure you want to delete this house?</p>
                            <div className="confimationMessageButtons">
                                <button
                                    type="button"
                                    className="button"
                                    aria-label="To delete your proffile on that house"
                                    onClick={confirmDeleteHouse}>Yes</button>
                                <button
                                    type="button"
                                    className="button"
                                    aria-label="To delete your proffile on that house"
                                    onClick={handleDeleteHouse}>No</button>
                            </div>

                        </div>
                    )}

                    <div className="adminContainer">
                        <div>
                            Are you the lead tenant of a house?
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

                        {formik.values.admin && formik.values.house === 'Not added yet' && (
                            <div className="confirmationMessage">

                                <button
                                    type="button"
                                    className="button"
                                    onClick={handleAddHouse}
                                    aria-label="To add a new house profile">Click to add a new house</button>
                            </div>

                        )}
                    </div>

                    <div className='submitButton'>
                        <button
                            type="submit"
                            className="button"
                            aria-label="To submit">Submit</button>
                    </div>
                </form >
            </section >

            <section id='logOut'>
                <button
                    type="button"
                    className="button"
                    aria-label="To Log out"
                    onClick={handleLogOut}>Log out</button>
            </section>

        </>

    )
}

export default Profile;