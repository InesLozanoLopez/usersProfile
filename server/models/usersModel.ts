"use strict"

import {sequelize} from './index';
import { DataTypes } from 'sequelize';

    const UsersModel = sequelize.define("UsersModel", {
        name: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        email: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        password: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        timestamps: {
            type: DataTypes.DATE,
            allowNull: false
        }
    })

    export default UsersModel;