const express = require('express');

const router = express.Router();
//post model
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//@routes POST api/posts
const {registeration,loginValdation} = require('../../validation');


router.post('/register',async (req,res)=>{
console.log(req.body);

    const {error}  = registeration(req.body);
    //res.send(error.details[0].message)

    if(error) return res.status(400).send(error.details[0].message);

    //checking if the user in database

    const emailExist = await User.findOne({email:req.body.email});

    if(emailExist) return res.status(400).send("Email already exist");

    //hash the password

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password,salt);
    req.body.password = hashPassword;

    const newUser = new User(req.body);
    console.log(newUser);
    try{
        const user = await newUser.save();
        if(!user) throw Error("something went wrong while saving post ");
        res.status(200).json(user);
    }catch(err){
        console.log(err);
        res.status(400).json(err);
    }
});

router.post('/login',async (req,res)=>{
    
    const {error}  = loginValdation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //const user = await User.findOne({email:req.body.email});
    const user = await User.findOne({email:req.body.email});
    if(!user) return res.status(400).send("Email is not found");

    const validPass = await bcrypt.compare(req.body.password,user.password);
    if(!validPass) return res.status(400).send('Invalid password');

    //create token 

    const token = jwt.sign({_id:user._id},process.env.TOKEN_SECRET);
    res.header('auth-token',token).send(token)

    //res.send("logged in!");
});






module.exports = router;