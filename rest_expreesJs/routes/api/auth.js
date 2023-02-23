const express = require('express');

const router = express.Router();
//post model
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//@routes POST api/posts
const {registeration,loginValdation} = require('../../validation');
const verified = require('./verifyToken');

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
    console.log("ssf")
    const {error}  = loginValdation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //const user = await User.findOne({email:req.body.email});
    const user = await User.findOne({email:req.body.email});
    if(!user) return res.status(400).send("Email is not found");

    const validPass = await bcrypt.compare(req.body.password,user.password);
    if(!validPass) return res.status(400).send('Invalid password');

    //create token 

    const token = jwt.sign({_id:user._id},process.env.TOKEN_SECRET);
    const data = {id:user._id,name:user.name,email:user.email,date:user.date,accessToken:token}
    res.header('auth-token',token).send(data)

    //res.send("logged in!");
});

router.post('/getUsers',verified,async (req,res)=>{
    
    try{
        const posts = await User.find();
        if(!posts) throw Error("No items");
        let tokenData = req.user
        let data = {posts,tokenData}
        res.status(200).json(data); 
      }catch(err){
          res.status(400).json(err);
      }

    //res.send("logged in!");
});

router.put('/updateUser',verified,async (req,res)=>{
    //console.log("user.update(",req);
    try{
        const user = await User.update({_id:req.body.id},{name:req.body.name});
        if(!user) throw Error("something went wrong while saving post ");
        res.status(200).json(req.body);
    }catch(err){
        console.log(err);
        res.status(400).json(err);
    }

    //res.send("logged in!");
});
router.delete('/delete/:id',verified,async(req,res)=>{
    try{
      //const posts = await Posts.findByIdAndDelete(req.params.id);
      const users = await User.findByIdAndDelete(req.params.id);
      if(!users) throw Error("No posts found!");
        res.status(200).json({success:true}); 
    }catch(err){
        res.status(400).json(err);
    }
});

router.get('/getUser/:id',verified,async (req,res)=>{
    //console.log("user.update(",req);
    try{
        const user = await User.find({"_id":req.params.id});
        if(!user) throw Error("something went wrong while saving post ");
        res.status(200).json(user[0]);
    }catch(err){
        console.log(err);
        res.status(400).json(err);
    }

    //res.send("logged in!");
});






module.exports = router;