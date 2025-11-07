const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
        trim : true
    },
    description : {
        type : String,
        required : true,
        trim : true
    },
    priority : {
        type : String,
        required : true,
        trim : true,
        enum : ["low","medium","high"],
        default : "low"
    },
    status : {
        type : String,
        required : true,
        trim : true,
        enum : ["yetToStart","InProgress","completed"],
        default : "yetToStart"
    }
});

const Task = mongoose.model('Task',taskSchema);

module.exports = Task;