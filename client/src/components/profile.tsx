import React, { useEffect, useState } from "react";
import { getUserInfo } from "../services/userProfile.services.tsx";
import { IUserInfo } from "../interfaces.tsx";

const Profile: React.FC = () => {
    const [user, setUser] = useState<IUserInfo | null>(null)

    useEffect(() => {
        const fetchUserInfo = async () => {
            try{
                const userInfo = await getUserInfo();
                setUser(userInfo);
            }catch(error){
                console.log(error)
            }
        }
        fetchUserInfo()
    },[])
    console.log(user)

    return (
        <>
        <h1>Hola {user?.admin}</h1>

        </>

    )
}

export default Profile;