import React, { useState } from 'react';
import './Task.css';

const Task = ({ task, onDelete, onToggle, onEdit, onAddCategory, onRemoveCategory, onAddDueDate, onAddPriority }) => {
  const [editing, setEditing] = useState(false);
  const [newText, setNewText] = useState(task.text);
  const [newPriority, setNewPriority] = useState(task.priority);

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSaveClick = () => {
    onEdit(task._id, newText);
    setEditing(false);
  };

  const handleCategoryClick = (category) => {
    if (task.categories.includes(category)) {
      onRemoveCategory(task._id, category);
    } else {
      onAddCategory(task._id, category);
    }
  };

  const handleDueDateChange = (event) => {
    onAddDueDate(task._id, event.target.value);
  };

  const handlePriorityChange = (event) => {
    const newPriority = event.target.value;
    setNewPriority(newPriority);
    onAddPriority(task._id, newPriority);
  };

  return (
    <div className={`task ${task.completed ? 'completed' : ''}`}>
      <div className="col">
        {editing ? (
          <input
            type="text"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
          />
        ) : (
          task.text
        )}
      </div>
      <div className="col">
        {task.completed ? 'Completed' : 'Not Completed'}
      </div>
      <div className="col">
        <div className="category-buttons">
          {['Select', 'Personal', 'Work', 'Study'].map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={task.categories.includes(category) ? 'selected' : ''}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      <div className="col">
        <select value={newPriority} onChange={handlePriorityChange}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>
      <div className="col">
        <input
          type="date"
          value={task.dueDate ? task.dueDate.split('T')[0] : ''}
          onChange={handleDueDateChange}
        />
      </div>
      <div className="col">
        {editing ? (
          <button onClick={handleSaveClick}>Save</button>
        ) : (
          <button onClick={handleEditClick}>Edit</button>
        )}
        <button className="delete-button" onClick={() => onDelete(task._id)}>Delete</button>
        <button className="complete-button" onClick={() => onToggle(task._id)}>
          {task.completed ? 'Uncomplete' : 'Complete'}
        </button>
      </div>
    </div>
  );
};

export default Task;
