"use strict"

import { Request, Response } from 'express';
import { UserState } from "./interfaces";

export const userDetails = async (req: Request, res: Response) => {
    try {
        const { id, email } = req.app.locals.user as UserState;
        res.status(200).send({ id, email })
    } catch (error) {
        res.status(500).send({ message: "Server Error" })
    }
}