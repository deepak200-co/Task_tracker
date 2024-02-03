import React, { useState, useEffect } from 'react';
import Header from './Header/Header';
import Tasks from './Tasks/Tasks';
import AddTask from './AddTask/Add';
import './Main.css';

function Main() {
  const [tasks, setTasks] = useState([]);
  const [duplicateTaskMessage, setDuplicateTaskMessage] = useState('');
  const [activeCategory, setActiveCategory] = useState('All'); // Initialize with 'All' as the default category

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text) => {
    const taskExists = tasks.some((task) => task.text === text);
    if (taskExists) {
      setDuplicateTaskMessage('Task already exists!');
    } else {
      setTasks([...tasks, { id: Date.now(), text, completed: false, categories: [], dueDate: '' }]);
      setDuplicateTaskMessage('');
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const editTask = (id, newText) => {
    setTasks(tasks.map((task) =>
      task.id === id ? { ...task, text: newText } : task
    ));
  };

  const addCategoryToTask = (taskId, category) => {
    setTasks(tasks.map((task) => {
      if (task.id === taskId && !task.categories.includes(category)) {
        return { ...task, categories: [...task.categories, category] };
      }
      return task;
    }));
  };
  const clearTasks = () => {
    // Clear all tasks by setting an empty array
    setTasks([]);
  };

  const removeCategoryFromTask = (taskId, category) => {
    setTasks(tasks.map((task) => {
      if (task.id === taskId && task.categories.includes(category)) {
        return { ...task, categories: task.categories.filter(cat => cat !== category) };
      }
      return task;
    }));
  };

  const addDueDateToTask = (taskId, dueDate) => {
    setTasks(tasks.map((task) =>
      task.id === taskId ? { ...task, dueDate } : task
    ));
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  // Filter tasks based on the active category
  const filteredTasks = tasks.filter((task) => activeCategory === 'All' || task.categories.includes(activeCategory));

  return (
    <div className="Main">
      <Header />
      <div className="category-buttons">
        <button
          className={activeCategory === 'All' ? 'active' : ''}
          onClick={() => setActiveCategory('All')}
        >
          All
        </button>
        <button
          className={activeCategory === 'Personal' ? 'active' : ''}
          onClick={() => setActiveCategory('Personal')}
        >
          Personal
        </button>
        <button
          className={activeCategory === 'Work' ? 'active' : ''}
          onClick={() => setActiveCategory('Work')}
        >
          Work
        </button>
        <button
          className={activeCategory === 'Study' ? 'active' : ''}
          onClick={() => setActiveCategory('Study')}
        >
          Study
        </button>
        
        <button onClick={clearTasks}>Clear All Tasks</button>
      </div>
      <AddTask onAdd={addTask} />
      {duplicateTaskMessage && <p className="duplicate-task-message">{duplicateTaskMessage}</p>}
      {filteredTasks.length > 0 ? (
        <Tasks
          tasks={filteredTasks}
          onDelete={deleteTask}
          onToggle={toggleComplete}
          onEdit={editTask}
          onAddCategory={addCategoryToTask}
          onRemoveCategory={removeCategoryFromTask}
          onAddDueDate={addDueDateToTask}
        />
      ) : (
        'No tasks to show'
      )}
    </div>
  );
}

export default Main;
