import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('usersmodel', '', '', {
    host: 'localhost',
    dialect: 'postgres'
  });

  async function authenticate() {
    try {
        await sequelize.authenticate();
        console.log("Connection to the database has been established successfully.");
    }catch (error){
        console.log(error)
    }
  } 

  authenticate()

