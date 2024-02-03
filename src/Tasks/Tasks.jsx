import React from 'react';
import Task from '../Task/Task';
import './Tasks.css';

const Tasks = ({ tasks, onDelete, onToggle, onEdit, onAddCategory, onRemoveCategory, onAddDueDate }) => {
  return (
    <table className="task-table">
      <thead>
        <tr>
          <th>Task</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            onDelete={onDelete}
            onToggle={onToggle}
            onEdit={onEdit} // Pass onEdit to Task
            onAddCategory={onAddCategory} // Pass onAddCategory to Task
            onRemoveCategory={onRemoveCategory} // Pass onRemoveCategory to Task
            onAddDueDate={onAddDueDate} // Pass onAddDueDate to Task
          />
        ))}
      </tbody>
    </table>
  );
};

export default Tasks;
