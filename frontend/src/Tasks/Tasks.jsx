import React from 'react';
import Task from '../Task/Task';
import './Tasks.css';

const Tasks = ({ tasks, onDelete, onToggle, onEdit, onAddCategory, onRemoveCategory, onAddDueDate, onAddPriority }) => {
  return (
    <div className="task-container">
      <div className="table-header">
        <div className="col">Task</div>
        <div className="col">Status</div>
        <div className="col">Category</div>
        <div className="col">Priority</div>
        <div className="col">Due Date</div>
        <div className="col">Action</div>
      </div>
      <div className="task-table">
        {tasks.map((task) => (
          <Task
            key={task._id} 
            task={task}
            onDelete={onDelete}
            onToggle={onToggle}
            onEdit={onEdit}
            onAddCategory={onAddCategory}
            onRemoveCategory={onRemoveCategory}
            onAddPriority={onAddPriority}
            onAddDueDate={onAddDueDate}
          />
        ))}
      </div>
    </div>
  );
};

export default Tasks;

// import React from 'react';
// import Task from '../Task/Task';
// import './Tasks.css';

// const Tasks = ({ tasks, onDelete, onToggle, onEdit, onAddCategory, onRemoveCategory, onAddDueDate, onAddPriority }) => {
//   return (
//     <div className="task-container">
//       <div className="table-header">
//         <div className="col">Task</div>
//         <div className="col">Status</div>
//         <div className="col">Category</div>
//         <div className="col">Priority</div>
//         <div className="col">Due Date</div>
//         <div className="col">Action</div>
//       </div>
//       <div className="task-table">
//         {tasks.map((task) => (
//           <Task
//             key={task._id} 
//             task={task}
//             onDelete={onDelete}
//             onToggle={onToggle}
//             onEdit={onEdit}
//             onAddCategory={onAddCategory}
//             onRemoveCategory={onRemoveCategory}
//             onAddPriority={onAddPriority}
//             onAddDueDate={onAddDueDate}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Tasks;
