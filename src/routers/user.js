const express = require("express");
const User = require("../../db/models/User");
const router = express.Router();
const auth = require('../middlewares/auth');

// Register User
// url : localhost:3000/users/register
// @params : name(required),phone_no(required),password(required),mail(optional)

router.post("/register", async (req, res) => {
  try {
	const user = await User.create(req.body,{ fields: ['name','password','phone_no','mail'] });
	const token = await user.generateToken()
    res.status(201).send({  message: "User Created Successfully",user,token });
  } catch (e) {
	  res.status(404).send({message:e.errors[0].message,user:null})
  }
});

// Login User
// url : localhost:3000/users/signin
// @params : phone_no(required),password(required)

router.post("/signin", async (req, res) => {
  try {
	const user = await User.checkCredentials(req.body.phone_no,req.body.password);
	const token = await user.generateToken()
	console.log(token)
	res.status(201).send({ message: "User LoggedIn Successfully",user:user, token });
  } catch (e) {
	res.status(404).send({message:e.message,user:null})
  }
});

// Read Profile
// url : localhost:3000/users/me
// @params : auth_token(required)

router.get("/me",auth, async (req, res) => {
  try {
	  const user = req.user;
	  const token = req.token
	  res.status(200).send({message:'Profile',user,token})
  } catch (e) {
	  res.status(400).send({message:e.message,user:null})
  }
});

// Find User
// url : localhost:3000/users/find?mail=... or localhost:3000/users/find?phone_no=...
// @params : auth_token(required), mail/phone_no (required)

router.get("/find",auth, async (req, res) => {
  try {
	  if(req.query.phone_no){
		  const user = await User.findOne({attributes:['name','phone_no','mail','spamCount'],where:{phone_no:req.query.phone_no}})
		  if(!user) throw new Error('Thier is no user with given phone number')

		  res.status(200).send({message:`Profile of the user with Phone no ${req.query.phone_no}`,user})
	  }else if(req.query.mail){
		const user = await User.findOne({where:{mail:req.query.mail},attributes:['name','phone_no','mail','spamCount']})
		if(!user) throw new Error('Thier is no user with given mail Id ')

		res.status(200).send({message:`Profile of the user with Mail Id ${req.query.mail}`,user})
	  }else{
		  throw new Error('Please Specify correct query parameters')
	  }
  } catch (e) {
	res.status(400).send({message:e.message,user:null})
  }
});

// Update User
// url : localhost:3000/users/me/update
// @params : auth_token(required),field to update (name,mail,password,contact_list)
// Note(Spam Count can't be updated by owner user)

router.patch("/me/update", auth,async (req, res) => {
  try {
	const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'mail', 'password', 'phone_no']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        throw new Error('Invalid update categories')
	}
	updates.forEach((update) => req.user[update] = req.body[update])
    await req.user.save()
    res.status(200).send({message:'User Updated Successfully',user:req.user})
  } catch (e) {
	res.status(404).send({message:e.message,user:null})
  }
});

// Mark User Spam
// url : localhost:3000/users/markSpam
// @params : auth_token(required),number(required)

router.post("/markSpam/:number", auth,async (req, res) => {
	try {
	  let user = await User.findOne({where:{phone_no:req.params.number}})
	  if(!user) {
		  let anonymous = await User.create({name:'anonymous',phone_no : req.params.number,password: 'anonymous'},{skip:['password']})
		  return res.status(204).send(anonymous)
	  }
	  if(user.phone_no == req.user.phone_no){
		  throw new Error('You Cannot mark yourself spam');
	  }else{
		  user = await user.increment('spamCount',{by:1})
		  res.status(202).send({message:`You have Spammed the user with phone no ${req.params.number}`,user})
	  }
	} catch (e) {
	  res.status(401).send({message:e.message,data:null})
	}
  });

// Logout User
// url : localhost:3000/users/logout
// @params : auth_token(required)

router.delete("/logout", auth,async (req, res) => {
  try {
	req.user.token = null
	req.user.save()
	res.status(200).send({message:'Logged Out Successfully',user:null})
  } catch (e) {
	res.status(404).send({message:e.message,user:null})
  }
});

// Delete User
// url : localhost:3000/users/delete
// @params : auth_token(required)

router.delete('/delete',auth,async (req,res)=>{
	try{
		await User.destroy({where: {phone_no:req.user.phone_no}});
		res.status(200).send({message:'User Deleted Successfully',user:null})
	}catch(e){
		res.status(404).send({message:e.message,user:null})
	}
})


module.exports = router;
