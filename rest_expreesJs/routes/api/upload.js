const express = require('express');
const User = require('../../models/User');
const router = express.Router();
const verified = require('./verifyToken');

const multer = require('multer');

const avatar = multer({
    limits:{
        fileSize:1000000
    },
    fileFilter(req,file,cd){
            console.log(file.originalname);
            if(!file.originalname.match(/\.(jpg|JPG|png|PNG|jpeg|JPEG)$/))
                    return cd(new Error("this is not correct format"));
                    cd(undefined,true);
            
    }
})

router.post('/',verified,avatar.single('avatar'),async(req,res)=>{
  // res.send();
  //req.User.avatar = req.file.buffer;
  //await req.User.save()
  try{
    const user = await User.findByIdAndUpdate("61fd33f7ac85fc3b7d55cdf6",{avatar: ''});
    if(!user) throw Error("Something went wrong whhile updating");
        console.log(user)
        res.status(200).json({success:true}); 
  }catch(err){
      res.status(400).json(err);
  }
},(err,req,res,next)=> res.status(404).send({error:err.message}));

//@routes POST api/posts




module.exports = router;