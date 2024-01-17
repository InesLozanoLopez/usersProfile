"use strict"

import { Request, Response } from 'express';
import UsersProfile from '../../models/UsersProfile';
import { IeditProfileRequest } from './interfaces';

export const userProfile = async (req: Request, res: Response) => {
    try {
        const id = req.app.locals.user.dataValues.id as number;
        const user = await UsersProfile.findOne({ where: { usersRegistration_id: id } });
        res.status(200).send({ user })
    } catch (error) {
        res.status(500).send({ message: "Server Error" })

    }
}


export const editProfile = async (req: Request, res: Response) => {
    try {
        console.log('HERE!!! req.body', req.body)
        console.log('userId', req.body.userId)

        const { house, photo, admin = false } = req.body.values as IeditProfileRequest;
        const userId = req.body.userId
        const userInstance = await UsersProfile.findOne({ where: { usersRegistration_id: userId } });

        if (!userInstance) {
            return res.status(404).send({ message: "User profile not found" })
        }

        userInstance.set({
            photo: photo,
            house: house,
            admin: admin,
        })
        await userInstance.save()

        res.status(200).send({ message: "Profile updated successfully" });
        console.log('saved!')

    } catch (error) {
        console.log('error controllers', error)
        res.status(500).send({ message: "Server Error" })

    }
}
