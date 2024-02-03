import React, { useState } from 'react';
import './Task.css'

const Task = ({ task, onDelete, onToggle, onEdit, onAddCategory, onRemoveCategory, onAddDueDate }) => {
  const [editing, setEditing] = useState(false);
  const [newText, setNewText] = useState(task.text);

  const handleEditClick = () => {
    setEditing(true);
  };


  const handleSaveClick = () => {
    onEdit(task.id, newText);
    setEditing(false);
  };


  const handleCategoryClick = (category) => {
    if (task.categories.includes(category)) {
      onRemoveCategory(task.id, category);
    } else {
      onAddCategory(task.id, category);
    }
  };

  const handleDueDateChange = (event) => {
    onAddDueDate(task.id, event.target.value);
  };

  return (
    <tr className={`task ${task.completed ? 'completed' : ''}`}>
      <td>
        {editing ? (
          <input
            type="text"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
          />
        ) : (
          task.text
        )}
      </td>
      <td>
        {task.completed ? 'Completed' : 'Not Completed'}
      </td>
      <td>
        {editing ? (
          <button onClick={handleSaveClick}>Save</button>
        ) : (
          <button onClick={handleEditClick}>Edit</button>
        )}
        <button className='delete-button' onClick={() => onDelete(task.id)}>Delete</button>
        <button className='complete-button' onClick={() => onToggle(task.id)}>
          {task.completed ? 'Uncomplete' : 'Complete'}
        </button>
        <div>
          Categories:
          {['Personal', 'Work', 'Study'].map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={task.categories.includes(category) ? 'selected' : ''}
            >
              {category}
            </button>
          ))}
        </div>
        <div>
          Due Date:
          <input
            type="date"
            value={task.dueDate || ''}
            onChange={handleDueDateChange}
          />
        </div>
      </td>
    </tr>
  );
};

export default Task;
