const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema({
    text: {
        type: String,
        required: false
    },
    dueDate: {
        type: Date,
        required: false
    },
    categories: {
        type: [String],
        required: false
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    priority: {
        type: String,
        enum: ['low', 'moderate', 'high'], 
        required: false
    },
    completed: {
        type: Boolean,
        default: false
    }
});


const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
