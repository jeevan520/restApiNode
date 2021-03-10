const express = require("express");
//te2yQtm4XVXMYcw1  jeevan
const mongoose = require("mongoose");
const { MONGO_URI } = require("./config");
const dotenv = require('dotenv');
dotenv.config();

//@Routes
const authRoute = require('./routes/api/auth')
const postsRoutes = require('./routes/api/posts');
const router = require("./routes/api/posts");
const app = express();

//body parser middleware

app.use(express.json());

mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true,useUnifiedTopology:true,useFindAndModify:false})
  .then(() => console.log("MONGODB CONNECTED!"))
  .catch(err => console.log(err));

// app.get('/',(req,res)=>{
//     res.send("Hello from node")
// });


//User routes

app.use('/api/posts',postsRoutes);
app.use('/api/user',authRoute)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server run at port ${PORT}`));
