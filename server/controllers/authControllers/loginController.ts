"use strict"

import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import UsersModel from "../../models/usersModel";
import { LoginRequestProps, RegisterRequestProps, UserState } from "./interfaces";

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY || "secret_key";

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body as LoginRequestProps;
        const user = await UsersModel.findOne({
            where: {email}
        }) as UserState | null;

        if (!user || !password) {
            return res.status(422).send({
                message: "Username or password is not correct"
            })
        }
        const isValidPassword = await bcrypt.compare(password, user.password);

        if(!isValidPassword) {
            return res.status(422).send({
                message: "Username or password is not correct"
            })
        }

        const accessToken = jwt.sign({ id: user.id }, SECRET_KEY);
        res.status(200).send({accessToken});

    } catch (error){
        console.log(error);
        res.status(500).send({message: "Server error"})
    }
}