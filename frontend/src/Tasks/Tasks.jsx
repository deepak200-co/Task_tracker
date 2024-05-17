// import React from 'react';
// import Task from '../Task/Task';
// import './Tasks.css';

// const Tasks = ({ tasks, onDelete, onToggle, onEdit, onAddCategory, onRemoveCategory, onAddDueDate }) => {
//   return (
//     <div className="task-container">
//       <div className="table-header">
//         <div className="col">Task</div>
//         <div className="col">Status</div>
//         <div className="col">Category</div>
//         <div className="col">Due Date</div>
//         <div className="col">Action</div>
//       </div>
//       <div className="task-table">
//         {tasks.map((task) => (
//           <div key={task.id} className="table-row">
//             <div className="col">{task.text}</div>
//             <div className="col">{task.completed ? 'Completed' : 'Pending'}</div>
//             <div className="col" >
//               {task.categories.map((category, index) => (
//                 <span key={index}>{category}</span>
//               ))}
//             </div>
//             <div className="col">{task.dueDate}</div>
//             <div className="col action-btns">
//               <button className="complete-button" onClick={() => onToggle(task.id)}>{task.completed ? 'Undo' : 'Complete'}</button>
//               <button className="delete-button" onClick={() => onDelete(task.id)}>Delete</button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Tasks;


import React from 'react';
import Task from '../Task/Task';
import './Tasks.css';

const Tasks = ({ tasks, onDelete, onToggle, onEdit, onAddCategory, onRemoveCategory, onAddDueDate }) => {
  return (
    <div className="task-container">
      <div className="table-header">
        <div className="col">Task</div>
        <div className="col">Status</div>
        <div className="col">Category</div>
        <div className="col">Due Date</div>
        <div className="col">Action</div>
      </div>
      <div className="task-table">
        {tasks.map((task) => (
          <Task
            key={task._id} // Using _id instead of id
            task={task}
            onDelete={onDelete}
            onToggle={onToggle}
            onEdit={onEdit}
            onAddCategory={onAddCategory}
            onRemoveCategory={onRemoveCategory}
            onAddDueDate={onAddDueDate}
          />
        ))}
      </div>
    </div>
  );
};

export default Tasks;
