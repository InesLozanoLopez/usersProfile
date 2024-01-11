"use strict"

import { Request, Response } from 'express';
import {RegisterRequestProps} from './interfaces';
import bcrypt from 'bcrypt';
import UsersRegistration from '../../models/UsersRegistration';
import UsersProfile from '../../models/UsersProfile';

export const register = async (req: Request, res: Response) => {
    try{
        const {name, email, password, confirmPassword } =
        req.body as RegisterRequestProps;

        const existingUser = await UsersRegistration.findOne({ where: {email} });

        if(existingUser) {
            return res.status(422).send({
                message: "This email has already been register"
            })
        }
        if(password.trim() === ''){
            return res.status(422).send({
                message: "Password cannot be empty"
            })
        }
        if(password !== confirmPassword){
            return res.status(422).send({
                message:"Password and confirm password do not match"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await UsersRegistration.create({
            name,
            email,
            password: hashedPassword,
        });
        await UsersProfile.create({
            usersRegistration_id: newUser.getDataValue('id'),
        })
        res.status(201).send({message: "User created succesfully"});
    } catch(error) {
        console.log(error);
        return res.status(500).send({ message: "Server error", error})
    }
} 

// export const editProfile = async (req: Request, res: Response) => {
//     try{
//         const {name, email, password: newPassword, confirmPassword: NewConfirmPassword } =
//         req.body as RegisterRequestProps;

//         const existingUser = await UsersRegistration.findOne({ where: {email} });

//         if (!existingUser) {
//             return res.status(404).send({ message: "User profile not found" })
//         }
        
//         if(existingUser.getDataValue('password').trim() === ''){
//             return res.status(422).send({
//                 message: "New password cannot be empty"
//             })
//         }
//         if(existingUser.getDataValue('password') !== existingUser.getDataValue('confirmPassword')){
//             return res.status(422).send({
//                 message:"New password and confirm new password do not match"
//             })
//         }


//         const user: RegisterRequestProps = existingUser.get() as RegisterRequestProps;
//         const hashedPassword = await bcrypt.hash(user.password, 10);
//         user.name = name;
//         user.email = email;
//         user.password = hashedPassword;

//         await existingUser.save()

//         res.status(200).send({ message: "Profile updated successfully" });

//     } catch (error) {
//         res.status(500).send({ message: "Server Error" })

//     }
// }