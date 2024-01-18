"use strict"

import { Request, Response } from 'express';
import { UserState } from "./interfaces";
import UsersRegistration from '../../models/UsersRegistration';
import bcrypt from 'bcrypt';


export const userDetails = async (req: Request, res: Response) => {
    try {
        const { id, email } = req.app.locals.user as UserState;
        res.status(200).send({ id, email })
    } catch (error) {
        res.status(500).send({ message: "Server Error" })
    }
}

export const changePassword = async (req: Request, res: Response) => {
    try {
        const {userId, newPassword, confirmNewPassword} = req.body;

        const existingUser = await UsersRegistration.findOne({ where: {userId} });

        if(!existingUser){
            return res.status(422).send({
                message: "This user is not register"
            })
        }
        if(newPassword.trim() === ''){
            return res.status(422).send({
                message: "New password cannot be empty"
            })
        }
        if(newPassword !== confirmNewPassword){
            return res.status(422).send({
                message:"New password and new confirm password do not match"
            })
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        existingUser.set({
            password: hashedPassword
        })
        await existingUser.save()
        res.status(201).send({message: "User password changed succesfully"});
    } catch(error) {
        console.log(error);
        return res.status(500).send({ message: "Server error", error})
    }

    }
}