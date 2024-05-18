const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const Task = require("./models/task"); 

app.use(cors());
app.use(express.json());
PORT= 5000;


app.post("/task/dueDate", async (req, res) => {
    try {
        const { taskId, dueDate, text, user } = req.body;
        let task = await Task.findById(taskId); 
        
        if (!task) {
            return res.status(404).json({ error: "Task not found" });
        }
        
        if (text) task.text = text; 
        if (user) task.user = user; 
        task.dueDate = dueDate;
        await task.save();
        
        res.status(200).json(task);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// app.post("/task/dueDate", async (req, res) => {
//     try {
//         const { taskId, dueDate } = req.body;
//         let task = await Task.findById(taskId); 
        
//         if (!task) {
//             return res.status(404).json({ error: "Task not found" });
//         }
        
//         task.dueDate = dueDate;
//         await task.save();
        
//         res.status(200).json(task);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

app.get("/tasks/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        const tasks = await Task.find({ user: userId }); 
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
app.get("/tasks", async (req, res) => {
  try {
      const { text, dueDate, categories, userId } = req.body;
      const task = await Task.create({ text, dueDate, categories, user: userId });
      res.status(201).json(task);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});
app.post("/tasks", async (req, res) => {
  try {
      const { text, dueDate, categories, userId } = req.body;
      if (!text || !userId) {
          return res.status(400).json({ error: "Text and user are required fields" });
      }
      const task = await Task.create({ text, dueDate, categories, user: userId });
      res.status(201).json(task);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});

app.put("/tasks/:taskId", async (req, res) => {
  try {
      const { taskId } = req.params;
      const { text, dueDate, categories, userId } = req.body;
      if (!text || !userId) {
          return res.status(400).json({ error: "Text and user are required fields" });
      }
      const updatedTask = await Task.findByIdAndUpdate(taskId, { text, dueDate, categories, user: userId }, { new: true });
      res.status(200).json(updatedTask);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});


mongoose.connect(`mongodb+srv://Task_Tracker:tasktracker@cluster0.ygbgeks.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });
