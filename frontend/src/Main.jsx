// import React, { useState, useEffect } from 'react';
// import Header from './Header/Header';
// import Tasks from './Tasks/Tasks';
// import AddTask from './AddTask/Add';
// import './Main.css';

// function Main() {
//   const [tasks, setTasks] = useState([]);
//   const [duplicateTaskMessage, setDuplicateTaskMessage] = useState('');
//   const [activeCategory, setActiveCategory] = useState('All'); 
//   const [showAddTaskModal, setShowAddTaskModal] = useState(false);


//   useEffect(() => {
//     const storedTasks = JSON.parse(localStorage.getItem('tasks'));
//     if (storedTasks) {
//       setTasks(storedTasks);
//     }
//   }, []);

//   useEffect(() => {
//     localStorage.setItem('tasks', JSON.stringify(tasks));
//   }, [tasks]);

//   const addTask = (text, dueDate, category) => {
//     const taskExists = tasks.some((task) => task.text === text);
//     if (taskExists) {
//       setDuplicateTaskMessage('Task already exists!');
//     } else {
//       setTasks([...tasks, { id: Date.now(), text, completed: false, categories: [category], dueDate }]);
//       setDuplicateTaskMessage('');
//       setShowAddTaskModal(false); // Close the modal after adding the task
//     }
//   };


//   const deleteTask = (id) => {
//     setTasks(tasks.filter((task) => task.id !== id));
//   };

//   const editTask = (id, newText) => {
//     setTasks(tasks.map((task) =>
//       task.id === id ? { ...task, text: newText } : task
//     ));
//   };

//   const addCategoryToTask = (taskId, category) => {
//     setTasks(tasks.map((task) => {
//       if (task.id === taskId && !task.categories.includes(category)) {
//         return { ...task, categories: [...task.categories, category] };
//       }
//       return task;
//     }));
//   };
//   const clearTasks = () => {
//     // Clear all tasks by setting an empty array
//     setTasks([]);
//   };
  


//   const removeCategoryFromTask = (taskId, category) => {
//     setTasks(tasks.map((task) => {
//       if (task.id === taskId && task.categories.includes(category)) {
//         return { ...task, categories: task.categories.filter(cat => cat !== category) };
//       }
//       return task;
//     }));
//   };

//   const addDueDateToTask = (taskId, dueDate) => {
//     setTasks(tasks.map((task) =>
//       task.id === taskId ? { ...task, dueDate } : task
//     ));
//   };

//   const toggleComplete = (id) => {
//     setTasks(tasks.map((task) =>
//       task.id === id ? { ...task, completed: !task.completed } : task
//     ));
//   };

//   const openAddTaskModal = () => {
//     setShowAddTaskModal(true);
//   };

//   const closeAddTaskModal = () => {
//     setShowAddTaskModal(false);
//   };

//   const filteredTasks = tasks.filter((task) => activeCategory === 'All' || task.categories.includes(activeCategory));
  
//   return (
//     <>
//     <Header />
//     <div className="Main">
  
//       <AddTask
//           isOpen={showAddTaskModal}
//           onClose={closeAddTaskModal}
//           onAdd={addTask}
//         />
//       {duplicateTaskMessage && <p className="duplicate-task-message">{duplicateTaskMessage}</p>}
//       {filteredTasks.length > 0 ? (
//         <Tasks
//           tasks={filteredTasks}
//           onDelete={deleteTask}
//           onToggle={toggleComplete}
//           onEdit={editTask}
//           onAddCategory={addCategoryToTask}
//           onRemoveCategory={removeCategoryFromTask}
//           onAddDueDate={addDueDateToTask}
//         />
//       ) : (
//         'No tasks to show'
//       )}
//     </div>
//     </>
//   );
// }

// export default Main;


// import React, { useState, useEffect } from 'react';
// import Header from './Header/Header';
// import Tasks from './Tasks/Tasks';
// import './Main.css';
// import axios from 'axios';

// function Main() {
//   const [tasks, setTasks] = useState([]);
//   const [duplicateTaskMessage, setDuplicateTaskMessage] = useState('');
//   const [activeCategory, setActiveCategory] = useState('All');
//   const [showAddTaskModal, setShowAddTaskModal] = useState(false);

//   useEffect(() => {
//     const storedTasks = JSON.parse(localStorage.getItem('tasks'));
//     if (storedTasks) {
//       setTasks(storedTasks);
//     }
//   }, []);

//   useEffect(() => {
//     localStorage.setItem('tasks', JSON.stringify(tasks));
//   }, [tasks]);


  
//   const addTask = async (text, dueDate, category) => {
//     try {
//       // Check if the task already exists
//       const existingTask = tasks.find(task => task.text === text);
//       if (existingTask) {
//         setDuplicateTaskMessage('Task already exists!');
//         return;
//       }
  
//       // If the task doesn't exist, proceed to add it
//       const taskData = { text, dueDate, categories: [category] };
//       const response = await axios.post("http://localhost:5000/tasks", taskData);
//       const newTask = response.data;
//       setTasks([...tasks, newTask]); // Update tasks state with the newly added task
//       setDuplicateTaskMessage('');
//       setShowAddTaskModal(false);
//     } catch (error) {
//       console.error("Error adding task:", error);
//     }
//   };
  

//   const updateTask = async (taskId, newText, newDueDate, newCategories) => {
//     try {
//       const updatedTaskData = { text: newText, dueDate: newDueDate, categories: newCategories };
//       const response = await axios.put(`http://localhost:5000/tasks/${taskId}`, updatedTaskData);
//       const updatedTask = response.data;
//       setTasks(tasks.map(task => (task.id === updatedTask.id ? updatedTask : task))); // Update tasks state with the modified task
//     } catch (error) {
//       console.error("Error updating task:", error);
//     }
//   };

//   const deleteTask = (id) => {
//     setTasks(tasks.filter((task) => task.id !== id));
//   };

//   const editTask = (id, newText) => {
//     setTasks(tasks.map((task) =>
//       task.id === id ? { ...task, text: newText } : task
//     ));
//   };

//   const addCategoryToTask = (taskId, category) => {
//     setTasks(tasks.map((task) => {
//       if (task.id === taskId && !task.categories.includes(category)) {
//         return { ...task, categories: [...task.categories, category] };
//       }
//       return task;
//     }));
//   };

//   const clearTasks = () => {
//     setTasks([]);
//   };

//   const removeCategoryFromTask = (taskId, category) => {
//     setTasks(tasks.map((task) => {
//       if (task.id === taskId && task.categories.includes(category)) {
//         return { ...task, categories: task.categories.filter(cat => cat !== category) };
//       }
//       return task;
//     }));
//   };

//   const addDueDateToTask = (taskId, dueDate) => {
//     setTasks(tasks.map((task) =>
//       task.id === taskId ? { ...task, dueDate } : task
//     ));
//   };

//   const toggleComplete = (id) => {
//     setTasks(tasks.map((task) =>
//       task.id === id ? { ...task, completed: !task.completed } : task
//     ));
//   };

//   const openAddTaskModal = () => {
//     const newWindow = window.open('', '_blank', 'width=500,height=500');
//     if (newWindow) {
//       newWindow.document.body.innerHTML = `
//         <div class="modal-container">
//           <div class="modal-header">
//             <h2>Add Task</h2>
//           </div>
//           <div class="modal-body">
//             <form id="addTaskForm">
//               <label for="taskText">Task:</label>
//               <input type="text" id="taskText" name="taskText" required><br><br>
              
//               <label for="dueDate">Due Date:</label>
//               <input type="date" id="dueDate" name="dueDate"><br><br>
              
//               <label for="category">Category:</label>
//               <select id="category" name="category">
//                 <option value="">select category</option>
//                 <option value="Personal">Personal</option>
//                 <option value="Work">Work</option>
//                 <option value="Study">Study</option>
//               </select><br><br>
//             </form>
//           </div>
//           <div class="modal-footer">
//             <button type="submit" form="addTaskForm">Add Task</button>
//             <button class="cancel-btn" type="button" onclick="window.close()">Cancel</button>
//           </div>
//         </div>
//       `;
  
//       newWindow.document.getElementById('addTaskForm').onsubmit = (event) => {
//         event.preventDefault();
//         const formData = new FormData(newWindow.document.getElementById('addTaskForm'));
//         const text = formData.get('taskText');
//         const dueDate = formData.get('dueDate');
//         const category = formData.get('category');
//         addTask(text, dueDate, category);
//         newWindow.close();
//       };
//     }
//   };
  
//   const closeAddTaskModal = () => {
//     setShowAddTaskModal(false);
//   };

//   const filteredTasks = tasks.filter((task) => activeCategory === 'All' || task.categories.includes(activeCategory));

//   return (
//     <>
//       <Header />
//       <div className="Main">
//         <div className="category-buttons">
//           <button
//             className={activeCategory === 'All' ? 'active' : ''}
//             onClick={() => setActiveCategory('All')}
//           >
//             All
//           </button>
//           <button
//           className={activeCategory === 'Personal' ? 'active' : ''}
//           onClick={() => setActiveCategory('Personal')}
//         >
//           Personal
//         </button>
//         <button
//           className={activeCategory === 'Work' ? 'active' : ''}
//           onClick={() => setActiveCategory('Work')}
//         >
//           Work
//         </button>
//         <button
//           className={activeCategory === 'Study' ? 'active' : ''}
//           onClick={() => setActiveCategory('Study')}
//         >
//           Study
//         </button>
//           <button onClick={clearTasks}>Clear All Tasks</button>
//           <button onClick={openAddTaskModal}>Add Task</button>
//         </div>
//         {duplicateTaskMessage && <p className="duplicate-task-message">{duplicateTaskMessage}</p>}
//         {filteredTasks.length > 0 ? (
//           <Tasks
//             tasks={filteredTasks}
//             onDelete={deleteTask}
//             onToggle={toggleComplete}
//             onEdit={editTask}
//             onAddCategory={addCategoryToTask}
//             onRemoveCategory={removeCategoryFromTask}
//             onAddDueDate={addDueDateToTask}
//           />
//         ) : (
//           <h2 className='No-task'>'No tasks to show'</h2>
//         )}
//       </div>
//     </>
//   );
// }

// export default Main;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header/Header';
import Tasks from './Tasks/Tasks';
import './Main.css';

function Main() {
  const [tasks, setTasks] = useState([]);
  const [duplicateTaskMessage, setDuplicateTaskMessage] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const currentUser = { id: 'YOUR_USER_ID' }; // Replace with actual user ID

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/tasks/${currentUser.id}`);
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = async (text, dueDate, category) => {
    const taskExists = tasks.some((task) => task.text === text);
    if (taskExists) {
      setDuplicateTaskMessage('Task already exists!');
    } else {
      try {
        const response = await axios.post('http://localhost:5000/tasks', {
          text,
          dueDate,
          categories: [category],
          userId: currentUser.id,
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
        addTask(text, dueDate, category);
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
