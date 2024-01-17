import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('usersmodel', '', '', {
  host: 'localhost',
  dialect: 'postgres'
});

async function authenticate() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("Database succesfully connected")
  } catch (error) {
    console.error('Error:', error);
  };
}

authenticate()