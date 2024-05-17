// backend/routes/tasks.js
const express = require('express');
const Task = require('../models/Task');
const jwt = require('jsonwebtoken');

const router = express.Router();

const authenticate = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, 'secret');
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

router.post('/', authenticate, async (req, res) => {
  const { text, dueDate, category } = req.body;
  try {
    const task = new Task({ text, dueDate, categories: [category], user: req.userId });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: 'Task creation failed' });
  }
});

router.get('/', authenticate, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.userId });
    res.json(tasks);
  } catch (error) {
    res.status(400).json({ error: 'Fetching tasks failed' });
  }
});

router.put('/:id', authenticate, async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate({ _id: req.params.id, user: req.userId }, req.body, { new: true });
    res.json(task);
  } catch (error) {
    res.status(400).json({ error: 'Updating task failed' });
  }
});

router.delete('/:id', authenticate, async (req, res) => {
  try {
    await Task.findOneAndDelete({ _id: req.params.id, user: req.userId });
    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(400).json({ error: 'Deleting task failed' });
  }
});

module.exports = router;
