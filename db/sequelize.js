const { Sequelize } = require('sequelize');
require('dotenv').config()
const sequelize = new Sequelize('your_db_name','your_db_user','your_db_password',
    {
        dialect:'mysql',
        host:'localhost'
    });

module.exports = sequelize    
