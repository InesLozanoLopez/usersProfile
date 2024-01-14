import './polyfills';
import React, { useEffect, useState } from "react";
import { IUserInfo } from "../interfaces";
import { useLocation, useNavigate } from "react-router-dom";
import { logout } from "../services/auth.services";
import { useFormik } from "formik";
import { updateUserInfo } from "../services/userProfile.services";

const Profile: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [userInfo, setUserInfo] = useState<IUserInfo>({})
    const [base64String, setBase64String] = useState('');


    const userId = location.state?.user.user.usersRegistration_id;

    const formik = useFormik({
        initialValues: {
            house: undefined,
            photo: null as File | null,
            admin: false,
        },
        onSubmit: async (values: IUserInfo) => {
            await updateUserInfo({ values, userId })
        }
    })

    useEffect(() => {
        const user = location.state?.user.user
        setUserInfo(user);

        if (user) {
            formik.setValues({
                house: user.house || undefined,
                photo: user.photo || null,
                admin: user.admin || false,
            })
            console.log('user', user.photo);
            const arrayBuffer = user.photo.data;
            const base64String = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
            setBase64String(base64String);

        } else {
            navigate('/')
        }
    }, [])

    const handleLogOut = () => {
        logout();
        navigate('/login');
    }


    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="house">House Address</label>
                <input type="text" id="house" name='house' value={formik.values.house} onChange={formik.handleChange} />
                <label htmlFor="photo">Profile photo</label>
                <div>
                    <input
                        type='file'
                        id="photo"
                        name='photo'
                        onChange={(e) => {
                            const files = e.currentTarget.files;
                            if (files && files.length > 0) {
                                const selectedFile = files[0]!;
                                formik.setValues({ ...formik.values, photo: selectedFile });
                            }
                        }
                        }
                    />
                    <div>
                        {formik.values.photo !== null && (
                            <div>
                                <img
                                    src={`data:image/jpeg;base64,${Buffer.from(base64String)}`}
                                    alt="Photo preview"
                                    style={{ maxWidth: '100px' }}
                                />
                            </div>
                        )}
                    </div>
                </div>
                <label htmlFor="admin">Are you the admin of the house?</label>
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
                <button type="submit">Submit</button>
            </form>


            <button onClick={handleLogOut}>Log out</button>
        </>

    )
}

export default Profile;