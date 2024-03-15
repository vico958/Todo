const mongoose = require("mongoose");
const schema = mongoose.Schema;

const todoSchema = new schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    isPriority:{
        type:Boolean,
        required:true
    },
    userId:{
        type:String,
        required:true
    }
}, {timestamps:true})

const todo = mongoose.model("Todo", todoSchema);

module.exports = {
    todo
}