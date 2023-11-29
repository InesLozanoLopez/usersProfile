"use strict"

import { Request, Response } from 'express';
import UsersModel from "../../models/usersModel"
import {RegisterRequestProps} from './interfaces';
import bcrypt from 'bcrypt';

export const register = async (req: Request, res: Response) => {
    try{
        const {name, email, password, confirmPassword } =
        req.body as RegisterRequestProps;

        const existingUser = await UsersModel.findOne({ where: {email} });

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
        await UsersModel.create({
            name,
            email,
            password: hashedPassword,
        });
        res.status(201).send({message: "User created succesfully"});
    } catch(error) {
        console.log(error);
        return res.status(500).send({ message: "Server error"})
    }
} 
