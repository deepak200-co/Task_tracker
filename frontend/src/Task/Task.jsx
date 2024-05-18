// import React, { useState } from 'react';
// import './Task.css'

// const Task = ({ task, onDelete, onToggle, onEdit, onAddCategory, onRemoveCategory, onAddDueDate }) => {
//   const [editing, setEditing] = useState(false);
//   const [newText, setNewText] = useState(task.text);

//   const handleEditClick = () => {
//     setEditing(true);
//   };


//   const handleSaveClick = () => {
//     onEdit(task.id, newText);
//     setEditing(false);
//   };


//   const handleCategoryClick = (category) => {
//     if (task.categories.includes(category)) {
//       onRemoveCategory(task.id, category);
//     } else {
//       onAddCategory(task.id, category);
//     }
//   };

//   const handleDueDateChange = (event) => {
//     onAddDueDate(task.id, event.target.value);
//   };

//   return (
//     <tr className={`task ${task.completed ? 'completed' : ''}`}>
//       <td>
//         {editing ? (
//           <input
//             type="text"
//             value={newText}
//             onChange={(e) => setNewText(e.target.value)}
//           />
//         ) : (
//           task.text
//         )}
//       </td>
//       <td>
//         {task.completed ? 'Completed' : 'Not Completed'}
//       </td>
//       <td>
//         {editing ? (
//           <button onClick={handleSaveClick}>Save</button>
//         ) : (
//           <button onClick={handleEditClick}>Edit</button>
//         )}
//         <button className='delete-button' onClick={() => onDelete(task.id)}>Delete</button>
//         <button className='complete-button' onClick={() => onToggle(task.id)}>
//           {task.completed ? 'Uncomplete' : 'Complete'}
//         </button>
//         <div>
//           Categories:
//           {['Select','Personal', 'Work', 'Study'].map((category) => (
//             <button
//               key={category}
//               onClick={() => handleCategoryClick(category)}
//               className={task.categories.includes(category) ? 'selected' : ''}
//             >
//               {category}
//             </button>
//           ))}
//         </div>
//         <div>
//           Due Date:
//           <input
//             type="date"
//             value={task.dueDate || ''}
//             onChange={handleDueDateChange}
//           />
//         </div>
//       </td>
//     </tr>
//   );
// };

// export default Task;


import React, { useState } from 'react';
import './Task.css';

const Task = ({ task, onDelete, onToggle, onEdit, onAddCategory, onRemoveCategory, onAddDueDate }) => {
  const [editing, setEditing] = useState(false);
  const [newText, setNewText] = useState(task.text);

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
