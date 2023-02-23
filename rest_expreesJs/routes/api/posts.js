const express = require('express');

const router = express.Router();
//post model
const Posts = require('../../models/Posts');

const verified = require('./verifyToken');
//@routes GET api/posts


router.get('/',verified,async(req,res)=>{
    try{
      const posts = await Posts.find();
      if(!posts) throw Error("No items");
      let tokenData = req.user
      let data = {posts,tokenData}
      res.status(200).json(data); 
    }catch(err){
        res.status(400).json(err);
    }
});

//@routes POST api/posts

router.post('/',verified,async (req,res)=>{
    const newPost = new Posts(req.body);
    try{
        const post = await newPost.save();
        if(!post) throw Error("something went wrong while saving post ");
        res.status(200).json(post);
    }catch(err){
        console.log(err);
        res.status(400).json(err);
    }
});

router.get('/lookUP',verified,async(req,res)=>{
    // try{
    //   const posts = await Posts.find();
    //   if(!posts) throw Error("No items");
    //   let tokenData = req.user
    //   let data = {posts,tokenData}
    //   res.status(200).json(data); 
    // }catch(err){
    //     res.status(400).json(err);
    // }

    console.log("look");
    try{
        const posts = await Posts.aggregate([
         // { $match: { "UserId": "postId" }},
         {
            "$project": {
              "_id": {
                "$toString": "$_id",
              },
              "title":{
                "$toString": "$title",
              },
              "body":{
                "$toString": "$body",
              }
            }
          },
            { $lookup:
                {
                  from: "test",
                  localField: "_id",
                  foreignField: "postId",
                  as: "testTable"
                }
            },{
                $unwind: "$testTable"
            },
         ]);
        if(!posts) throw Error("No items");
        let tokenData = req.user
        let data = {posts,tokenData}
        res.status(200).json(data); 
      }catch(err){
          res.status(400).json(err);
      }
});

//@routes DELETE api/posts/:id
router.delete('/:id',verified,async(req,res)=>{
    try{
      //const posts = await Posts.findByIdAndDelete(req.params.id);
      const posts = await Posts.findByIdAndDelete(req.params.id);
      if(!posts) throw Error("No posts found!");
        res.status(200).json({success:true}); 
    }catch(err){
        res.status(400).json(err);
    }
});

//@routes UPDATE api/posts/:id

router.patch('/:id',verified,async(req,res)=>{
  //console.log("req",req)
    try{
      const posts = await Posts.findByIdAndUpdate(req.params.id,req.body);
      if(!posts) throw Error("Something went wrong whhile updating");
        res.status(200).json({success:true}); 
    }catch(err){
        res.status(400).json(err);
    }
});

//@routes GET : ID api/posts


router.get('/:id',verified,async(req,res)=>{
    try{
      const posts = await Posts.findById(req.params.id);
      if(!posts) throw Error("No items");
      res.status(200).json(posts); 
    }catch(err){
        res.status(400).json(err);
    }
});

module.exports = router;
