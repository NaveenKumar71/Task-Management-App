import React, { useState, useEffect } from 'react';

const initialState = {
  id: null,
  title: '',
  description: '',
  dueDate: '',
  priority: 'Low',
  completed: false,
};

function TaskForm({ addOrUpdateTask }) {
  const [task, setTask] = useState(initialState);

  useEffect(() => {
    setTask(initialState);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.title.trim() === '') return;
    addOrUpdateTask(task);
    setTask(initialState);
  };

  return (
    <form onSubmit={handleSubmit} className="card card-body mb-4">
      <div className="form-group mb-3">
        <label>Task Title</label>
        <input 
          type="text" 
          className="form-control" 
          name="title" 
          value={task.title} 
          onChange={handleChange} 
          required 
        />
      </div>
      <div className="form-group mb-3">
        <label>Task Description</label>
        <textarea 
          className="form-control" 
          name="description" 
          value={task.description} 
          onChange={handleChange} 
        ></textarea>
      </div>
      <div className="form-group mb-3">
        <label>Due Date</label>
        <input 
          type="date" 
          className="form-control" 
          name="dueDate" 
          value={task.dueDate} 
          onChange={handleChange} 
        />
      </div>
      <div className="form-group mb-3">
        <label>Priority</label>
        <select 
          className="form-control" 
          name="priority" 
          value={task.priority} 
          onChange={handleChange}
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
      </div>
      <button type="submit" className="btn btn-primary w-100">
        {task.id ? 'Update Task' : 'Add Task'}
      </button>
    </form>
  );
}

export default TaskForm;
