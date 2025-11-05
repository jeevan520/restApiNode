const express = require("express");
const mongoose = require("mongoose");
const { MONGO_URI } = require("./config");
const dotenv = require('dotenv');
dotenv.config();

//@Routes
const authRoute = require('./routes/api/auth')
const postsRoutes = require('./routes/api/posts');
const uploadRoutes = require('./routes/api/upload');
//const router = require("./routes/api/posts");
const app = express();

//body parser middleware

app.use(express.json());
//process.env.MONGO_URI
console.log("MONGO_URI",MONGO_URI)
mongoose.connect(MONGO_URI,{useNewUrlParser:true,useUnifiedTopology:true,useFindAndModify:false})
  .then(() => console.log("MONGODB CONNECTED!"))
  .catch(err => {
    console.log("error while conncting");
    console.log(process.env.MONGO_URI)
    console.log(err)
}
  );

app.get('/',(req,res)=>{
    res.send("Hello from node")
});


//User routes
var cors = require('cors')

app.use(cors())

app.use('/api/posts',postsRoutes);
app.use('/api/user',authRoute);
app.use('/api/upload',uploadRoutes)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server run at port ${PORT}`));
