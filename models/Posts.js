const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const PostSchema = new Schema({
    title:{
        type:String,
        required:true,
    },
    body:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    UserId:{
        type:String
    }
});

module.exports = mongoose.model('Posts',PostSchema);


