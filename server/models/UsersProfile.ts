'use strict';

import { sequelize } from './index';
import { DataTypes } from 'sequelize';
import UsersRegistration from './UsersRegistration';

const UsersProfile = sequelize.define('UsersProfile', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  usersRegistration_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: UsersRegistration,
      key: 'id',
    },
  },
  photo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  house: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  admin: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default UsersProfile;
