import React, { useEffect } from "react";
import Logout from "./../logOut";
import ProfilePhoto from "./profileComponents/profilePhoto";
import './../../styles/Profile.css';
import { useLocation, useNavigate } from "react-router-dom";
import ProfileForm from "./profileComponents/profileForm";
import { updateUserInfo } from "../../services/userProfile.services";
import { useFormik } from "formik";
import { IUserInfo } from "../../interfaces";

const Profile: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

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




    return (
        <>
            <section id='profilePhoto'>
               <ProfilePhoto
               formik={formik}
               />
            </section>
            <section id='form'>
               <ProfileForm
               formik={formik}
               />
            </section >

            <section id='logOut'>
                <Logout />
            </section>

        </>

    )
}

export default Profile;