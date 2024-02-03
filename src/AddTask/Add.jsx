import React, { useState } from 'react';
import './Add.css';

const AddTask = ({ onAdd }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text) return;
    onAdd(text);
    setText('');
  };

  return (
    <div className='add'>
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className='Search'
        placeholder="Add Task"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button  className='Add-btn'  type="submit">Add</button>
    </form>
    </div>
  );
};

export default AddTask;
