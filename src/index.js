// Require Libraries
const express = require('express');

const userRouter = require('./routers/user');
const sequelize = require('../db/sequelize');

require('dotenv').config()

// Initalise App
const app  = express();


// Create Port
const port = process.env.PORT || 3000;


// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended:false}));

// Syncing Database
sequelize.sync().then(result=>console.log('Connected with Database'))
.catch(e=>console.log('Error Occured '))

// Route Middleware
app.use('/users',userRouter);


// Listening at Server
app.listen(port,()=>{
	console.log(`Server is running at port ${port}`)
})