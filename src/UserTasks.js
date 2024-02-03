import React, { useState, useEffect } from 'react';
import { database } from '../firebase';

const UserTasks = ({ user }) => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    const userTasksRef = database.ref(`tasks/${user.uid}`);

    userTasksRef.on('value', (snapshot) => {
      if (snapshot.val()) {
        setTasks(Object.values(snapshot.val()));
      }
    });

    return () => {
      userTasksRef.off();
    };
  }, [user.uid]);

  const addTask = () => {
    if (newTask) {
      const taskRef = database.ref(`tasks/${user.uid}`).push();
      taskRef.set({ text: newTask, completed: false });
      setNewTask('');
    }
  };

  return (
    <div>
      <h2>Welcome, {user.email}</h2>
      <input
        type="text"
        placeholder="Add a task"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button onClick={addTask}>Add Task</button>
      <ul>
        {tasks.map((task) => (
          <li key={task.key}>{task.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserTasks;
