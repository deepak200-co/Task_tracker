// const mongoose = require("mongoose");

// const taskSchema = new mongoose.Schema({
//     text:{
//         type:String,
//         required:true
//     },
//     completed:{
//         type:Boolean,
//         default: false
//     },
//     categories:{
//         type:String,
//         default:[]
//     },
//     duedate:{
//         type: Date
//     },
//     user:{
//         type: mongoose.Schema.Types.ObjectId,
//         ref:'User',
//         required: true
//         }
    
// });

// const Task = mongoose.model("Task", taskSchema);
// module.exports = Task


const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    text: {
        type: String,
        required: [true, 'Path `text` is required.']
    },
    dueDate: {
        type: Date,
        required: false
    },
    categories: {
        type: [String],
        required: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Path `user` is required.']
    },
    completed: {
        type: Boolean,
        default: false
    }
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
