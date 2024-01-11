"use strict"

import { sequelize } from './index';
import { DataTypes } from 'sequelize';

const UsersRegistration = sequelize.define("UsersRegistration", {
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

sequelize.sync().then(() => {
    console.log('Database synchroninzed successfully');
}).catch((error) => {
    console.log(error)
})
export default UsersRegistration;