import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header/Header';
import Tasks from './Tasks/Tasks';
import './Main.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from './firebase';

function Main() {
  const [tasks, setTasks] = useState([]);
  const [user] = useAuthState(auth);
  const [duplicateTaskMessage, setDuplicateTaskMessage] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  
  
const addTask = async (text, dueDate, category, priorities) => {


  const taskExists = tasks.some((task) => task.text === text);
  if (taskExists) {
    setDuplicateTaskMessage('Task already exists!');
  } else {
    try {
      const response = await axios.post('http://localhost:5000/tasks', {
        text,
        dueDate,
        categories: [category],
        email: user.email,
        priorities,
      });
      setTasks([...tasks, response.data]);
      setDuplicateTaskMessage('');
      setShowAddTaskModal(false);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  }
};


  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/tasks/${id}`);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const editTask = async (id, newText) => {
    try {
      const response = await axios.put(`http://localhost:5000/tasks/${id}`, {
        text: newText,
      });
      setTasks(tasks.map((task) => (task.id === id ? response.data : task)));
    } catch (error) {
      console.error('Error editing task:', error);
    }
  };

  const addCategoryToTask = async (taskId, category) => {
    const task = tasks.find((task) => task.id === taskId);
    if (task && !task.categories.includes(category)) {
      try {
        const response = await axios.put(`http://localhost:5000/tasks/${taskId}`, {
          ...task,
          categories: [...task.categories, category],
        });
        setTasks(tasks.map((t) => (t.id === taskId ? response.data : t)));
      } catch (error) {
        console.error('Error adding category to task:', error);
      }
    }
  };

  const removeCategoryFromTask = async (taskId, category) => {
    const task = tasks.find((task) => task.id === taskId);
    if (task && task.categories.includes(category)) {
      try {
        const response = await axios.put(`http://localhost:5000/tasks/${taskId}`, {
          ...task,
          categories: task.categories.filter((cat) => cat !== category),
        });
        setTasks(tasks.map((t) => (t.id === taskId ? response.data : t)));
      } catch (error) {
        console.error('Error removing category from task:', error);
      }
    }
  };

  const addDueDateToTask = async (taskId, dueDate) => {
    try {
      const response = await axios.put(`http://localhost:5000/tasks/${taskId}`, {
        dueDate,
      });
      setTasks(tasks.map((task) => (task.id === taskId ? response.data : task)));
    } catch (error) {
      console.error('Error adding due date to task:', error);
    }
  };

  const toggleComplete = async (id) => {
    const task = tasks.find((task) => task.id === id);
    try {
      const response = await axios.put(`http://localhost:5000/tasks/${id}`, {
        ...task,
        completed: !task.completed,
      });
      setTasks(tasks.map((task) => (task.id === id ? response.data : task)));
    } catch (error) {
      console.error('Error toggling task completion:', error);
    }
  };

  const openAddTaskModal = () => {
    const newWindow = window.open('', '_blank', 'width=500,height=500');
    if (newWindow) {
      newWindow.document.body.innerHTML = `
        <div class="modal-container">
          <div class="modal-header">
            <h2>Add Task</h2>
          </div>
          <div class="modal-body">
            <form id="addTaskForm">
              <label for="taskText">Task:</label>
              <input type="text" id="taskText" name="taskText" required><br><br>
              
              <label for="dueDate">Due Date:</label>
              <input type="date" id="dueDate" name="dueDate"><br><br>
              
              <label for="category">Category:</label>
              <select id="category" name="category">
                <option value="">select category</option>
                <option value="Personal">Personal</option>
                <option value="Work">Work</option>
                <option value="Study">Study</option>
              </select><br><br>
              <label for="priority">Priorities:</label>
              <select id="priority" name="priority">
                <option value="">select priority</option>
                <option value="High">High</option>
                <option value="moderate">Moderate</option>
                <option value="low">low</option>
              </select><br><br>
            </form>
          </div>
          <div class="modal-footer">
            <button type="submit" form="addTaskForm">Add Task</button>
            <button class="cancel-btn" type="button" onclick="window.close()">Cancel</button>
          </div>
        </div>
      `;

      newWindow.document.getElementById('addTaskForm').onsubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(newWindow.document.getElementById('addTaskForm'));
        const text = formData.get('taskText');
        const dueDate = formData.get('dueDate');
        const category = formData.get('category');
        const priority = formData.get('priority');

        addTask(text, dueDate, category, priority);
        newWindow.close();
      };
    }
  };

  const closeAddTaskModal = () => {
    setShowAddTaskModal(false);
  };

  const filteredTasks = tasks.filter((task) => activeCategory === 'All' || task.categories.includes(activeCategory));

  return (
    <>
      <Header />
      <div className="Main">
        <div className="sidebar">
          <button className={activeCategory === 'All' ? 'active' : ''} onClick={() => setActiveCategory('All')}>All</button><hr></hr>
          <button className={activeCategory === 'Personal' ? 'active' : ''} onClick={() => setActiveCategory('Personal')}>Personal</button><hr></hr>
          <button className={activeCategory === 'Work' ? 'active' : ''} onClick={() => setActiveCategory('Work')}>Work</button><hr></hr>
          <button className={activeCategory === 'Study' ? 'active' : ''} onClick={() => setActiveCategory('Study')}>Study</button><hr></hr>
          <button className={activeCategory === 'Completed' ? 'active' : ''} onClick={() => setActiveCategory('Completed')}>Completed</button><hr></hr>
          <button className={activeCategory === 'Pending' ? 'active' : ''} onClick={() => setActiveCategory('Pending')}>Pending</button><hr></hr>
          <button className={activeCategory === 'Deleted' ? 'active' : ''} onClick={() => setActiveCategory('Deleted')}>Deleted</button>
          <button onClick={openAddTaskModal}>Add Task</button>

        </div>
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
          <h2 className='No-task'>No tasks to show</h2>
        )}
      </div>
    </>
  );
}

export default Main;
