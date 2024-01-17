"use strict"

import express, { Application } from 'express';
import cors from 'cors';
import router from './router';

const app: Application = express();
const port: number = 3001;

app.use(express.json());
app.use(cors());
app.use(router);

app.listen(port, (error?: Error) => {
    if (error) {
        console.error('Error starting the server:', error)
    } else {
        console.log(`Server running at ${port}`);
    }
})