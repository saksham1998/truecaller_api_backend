const { Sequelize } = require('sequelize');
require('dotenv').config()
const sequelize = new Sequelize('truecaller','root',process.env.DB_PASS,
    {
        dialect:'mysql',
        host:'localhost'
    });

module.exports = sequelize    