const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const TestSchema = new Schema({
    
    postId:{
        type:String,
        required:true
    },
    test:{
        type:String,
        required:true
    },
   
});

module.exports = mongoose.model('Test',TestSchema);


