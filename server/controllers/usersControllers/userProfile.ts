"use strict"

import { Request, Response } from 'express';
import UsersProfile from '../../models/UsersProfile';
import { IUserInfo } from './interfaces';

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
        const id = req.app.locals.user as number;
        const { photo, house, admin } = req.body;
        const userInstance = await UsersProfile.findOne({ where: { usersRegistration_id: id } });

        if (!userInstance) {
            return res.status(404).send({ message: "User profile not found" })
        }

        const user: IUserInfo = userInstance.get() as IUserInfo;
        user.photo = photo;
        user.house = house;
        user.admin = admin;
        await userInstance.save()
        res.status(200).send({ message: "Profile updated successfully" });

    } catch (error) {
        res.status(500).send({ message: "Server Error" })

    }
}
