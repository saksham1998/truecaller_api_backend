// Load Libraries
const { Sequelize } = require("sequelize");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config()

const sequelize = require("../sequelize");

// Create Model
const User = sequelize.define("user", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: [2, 15],
    },
  },
  password: {
    type: Sequelize.STRING,
    allowNull:false,
    validate: {
      len: [6, ],
      notIn:[['password','default']],
    },
  },
  phone_no: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      is: /^[0-9]+$/i, 
      len: [10],
    },
  },
  mail: {
    type: Sequelize.STRING,
    allowNull: true,
    validate: {
      isEmail: true,
    },
  },
  spamCount: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  token: {
    type: Sequelize.STRING,
  },
});


// Generate JWT Token

User.prototype.generateToken = async function () {
  console.log(this.dataValues)
  const token = jwt.sign({ id: this.dataValues.id }, process.env.JWT_SECRET);
  await this.update({token:token})
  return token;
};

// Authentication 

User.checkCredentials = async (phone_no, password) => {
  const user = await User.findOne({
    where: {
      phone_no: phone_no,
    },
  });
  if (!user) throw new Error("Phone number is not valid");
  if (!(await bcrypt.compare(password, user.password)))
    throw new Error("Password is not correct");

  return user;
};

// Hash Password

User.beforeCreate((user) => {
  return bcrypt
    .hash(user.password, 10)
    .then((hash) => {
      user.password = hash;
    })
    .catch((err) => {
      throw new Error('Error Occured while saving the Data');
    });
});

User.beforeUpdate((user) => {
  if(user.changed([user.password])){
    return bcrypt
    .hash(user.password, 10)
    .then((hash) => {
      user.password = hash;
    })
    .catch((err) => {
      throw new Error('Error Occured while saving the Data');
    });
  }
});

module.exports = User;
