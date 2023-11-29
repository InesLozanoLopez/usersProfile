"use strict"

import { sequelize } from './index';
import { DataTypes } from 'sequelize';

const UsersModel = sequelize.define("UsersModel", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }
})

export default UsersModel;