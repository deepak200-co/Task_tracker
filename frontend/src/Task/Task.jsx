import React from 'react';
import './Task.css';

const Task = ({ task, onDelete, onToggle }) => {
  return (
    <div className={`task ${task.completed ? 'completed' : ''}`}>
      <div className="col">
        {task.text}
      </div>
      <div className="col">
        {task.completed ? 'Completed' : 'Not Completed'}
      </div>
      <div className="col">
        <div className="category-display">
          {task.categories.join(', ')}
        </div>
      </div>
      <div className="col">
        {task.priorities}
      </div>
      <div className="col">
        <div className="due-date-display">
          {task.dueDate ? task.dueDate.split('T')[0] : 'No due date'}
        </div>
      </div>
      <div className="col">
        <button className="delete-button" onClick={() => onDelete(task._id)}>Delete</button>
        <button className="complete-button" onClick={() => onToggle(task._id)}>
          {task.completed ? 'Uncomplete' : 'Complete'}
        </button>
      </div>
    </div>
  );
};

export default Task;
