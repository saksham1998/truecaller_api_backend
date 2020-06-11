const { Sequelize } = require('sequelize');
require('dotenv').config()
const sequelize = new Sequelize('your_db_name','root',process.env.DB_PASS,
    {
        dialect:'mysql',
        host:'localhost'
    });

module.exports = sequelize    
