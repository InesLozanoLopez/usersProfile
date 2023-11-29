"use strict"
import { Request, Response, Router } from 'express';
import authRouter  from "./router/authRouter";

const router = Router();

router.use('/', authRouter);
router.use('*', (req: Request, res: Response) => {
    res.status(404);
    res.send("Not found");
})


export default router;