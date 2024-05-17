const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const Task = require("./models/task"); 
const { MONGO_URI, PORT } = require("./constants");

app.use(cors());
app.use(express.json());


app.post("/task/dueDate", async (req, res) => {
    try {
        const { taskId, dueDate } = req.body;
        let task = await Task.findById(taskId); // Use the Task model
        
        if (!task) {
            return res.status(404).json({ error: "Task not found" });
        }
        
        task.dueDate = dueDate;
        await task.save();
        
        res.status(200).json(task);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get("/tasks/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        const tasks = await Task.find({ user: userId }); 
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post("/tasks", async (req, res) => {
  try {
      const { text, dueDate, categories, userId } = req.body;
      const task = await Task.create({ text, dueDate, categories, user: userId });
      res.status(201).json(task);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});

app.put("/tasks/:taskId", async (req, res) => {
  try {
      const { taskId } = req.params;
      const { text, dueDate, categories } = req.body;
      const updatedTask = await Task.findByIdAndUpdate(taskId, { text, dueDate, categories }, { new: true });
      res.status(200).json(updatedTask);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});
mongoose.connect(MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });
