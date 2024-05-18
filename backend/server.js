const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const Task = require("./models/task");

app.use(cors());
app.use(express.json());
const PORT = 5000;

app.get("/:email",async(req,res) => {
    try {
        const {email} = req.params
        let user = await Task.findOne({email})
        if(!user){
            user = await Task.create({email})
        }
        res.status(200).json(user)
    } catch(err) {
        res.status(500)
    }
})

// Route to create a task
app.post("/tasks", async (req, res) => {
    try {
        const { text, dueDate, categories, email } = req.body; // Use email instead of user
        if (!text || !email) {
            return res.status(400).json({ error: "Text and email are required fields" });
        }
        const task = await Task.create({ text, dueDate, categories, email }); // Use email instead of user
        res.status(201).json(task);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Route to update a task
app.put("/tasks/:taskId", async (req, res) => {
    try {
        const { taskId } = req.params;
        const { text, dueDate, categories, email } = req.body; // Use email instead of user
        if (!text || !email) {
            return res.status(400).json({ error: "Text and email are required fields" });
        }
        const updatedTask = await Task.findByIdAndUpdate(taskId, { text, dueDate, categories, email }, { new: true }); // Use email instead of user
        res.status(200).json(updatedTask);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

mongoose
    .connect(`mongodb+srv://Task_Tracker:tasktracker@cluster0.ygbgeks.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error("MongoDB connection error:", error);
    });
