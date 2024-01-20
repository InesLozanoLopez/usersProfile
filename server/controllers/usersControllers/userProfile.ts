'use strict';

import { Request, Response } from 'express';
import UsersProfile from '../../models/UsersProfile';
import { IeditProfileRequest } from './interfaces';
import UsersRegistration from '../../models/UsersRegistration';

export const userProfile = async (req: Request, res: Response) => {
  try {
    const id = req.app.locals.user.dataValues.id as number;
    const user = await UsersProfile.findOne({
      where: { usersRegistration_id: id },
    });
    res.status(200).send({ user });
  } catch (error) {
    res.status(500).send({ message: 'Server Error' });
  }
};

export const editProfile = async (req: Request, res: Response) => {
  try {
    const {
      house,
      photo,
      admin = false,
      email,
      name,
    } = req.body.values as IeditProfileRequest;

    const userId = req.body.userId;
    const userInstancebyId = await UsersProfile.findOne({
      where: { usersRegistration_id: userId },
    });
    const userInstancebyEmail = await UsersRegistration.findOne({
      where: {email: email}
    })

    if (!userInstancebyId) {
      return res.status(404).send({ message: 'User profile not found' });
    }
    if(userInstancebyEmail && userInstancebyEmail.dataValues.email !== userInstancebyId.dataValues.email) {
      return res.status(404).send({ message: 'That email is already regitrer with other profile'});
    }

    userInstancebyId.set({
      photo: photo,
      house: house,
      admin: admin,
      email: email,
      name: name,
    });
    await userInstancebyId.save();

    const userRegistration = await UsersRegistration.findOne({
      where: {id : userId}
    })
    if (userRegistration) {
      userRegistration.set({
        email: email,
        name: name,
      });
      await userRegistration?.save();
    }

    res.status(200).send({ message: 'Profile updated successfully' });
  } catch (error) {
    console.log('error controllers', error);
    res.status(500).send({ message: 'Server Error' });
  }
};
