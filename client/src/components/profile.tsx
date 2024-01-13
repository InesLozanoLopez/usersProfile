import React, { useEffect } from "react";
import { IUserInfo } from "../interfaces.tsx";
import { useLocation, useNavigate } from "react-router-dom";
import { logout } from "../services/auth.services.tsx";
import { useFormik } from "formik";
import { updateUserInfo } from "../services/userProfile.services.tsx";

const Profile: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const userId = location.state?.user.user.usersRegistration_id;

    const formik = useFormik({
        initialValues: {
            house: undefined,
            photo: null,
            admin: false,
        },
        onSubmit: async (values: IUserInfo) => {
            await updateUserInfo({ values, userId })
        }
    })

    useEffect(() => {
        const userInfo = location.state?.user;
        if (userInfo) {
            formik.setValues({
                house: userInfo.house || undefined,
                photo: userInfo.photo || null,
                admin: userInfo.admin || false,
            })
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
                            if(files && files.length > 0){
                                formik.setValues({...formik.values, photo: files[0]});
                        }}
                        }
                    />
                    {formik.values.photo && (
                        <div>
                            {typeof formik.values.photo === 'object' ? (
                                <img src={URL.createObjectURL(formik.values.photo)} alt="Photo preview" style={{ maxWidth: '100px' }} />
                            ) : (
                                formik.values.photo.startsWith('data:image') ? (
                                    <img src={formik.values.photo} alt="Photo preview" style={{ maxWidth: '100px' }} />
                                ) : (
                                    <img src={formik.values.photo} alt="Photo preview" style={{ maxWidth: '100px' }} />
                                )
                            )}
                        </div>
                    )}

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