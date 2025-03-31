import React, { useState, useContext, useEffect } from 'react';
import { TaskContext } from '../context/TaskContext';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { format, isValid, parseISO } from 'date-fns';

function Tasks() {
  const { tasks, addTask, toggleTask, deleteTask, editTask, reorderTasks } = useContext(TaskContext);
  const [newTask, setNewTask] = useState({ 
    title: '', 
    description: '', 
    priority: 'medium',
    dueDate: format(new Date(), 'yyyy-MM-dd')
  });
  const [editingTask, setEditingTask] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [filter, setFilter] = useState('all');
  
  // ✅ Motivational quotes logic inside component
  const motivationalQuotes = [
    "Stay focused and never give up.",
    "Your only limit is your mind.",
    "Push yourself, because no one else is going to do it for you.",
    "Dream it. Wish it. Do it.",
    "Don’t watch the clock; do what it does — keep going.",
    "Great things never come from comfort zones.",
    "Success doesn’t come to you. You go to it.",
    "Believe in yourself and all that you are.",
  ];

  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex(prevIndex => (prevIndex + 1) % motivationalQuotes.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const formatDate = (dateString) => {
    try {
      const date = parseISO(dateString);
      if (isValid(date)) {
        return format(date, 'MMM dd, yyyy');
      }
      return 'No due date';
    } catch {
      return 'No due date';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingTask) {
      editTask(editingTask.id, newTask);
      setEditingTask(null);
    } else {
      addTask(newTask);
    }
    setNewTask({ 
      title: '', 
      description: '', 
      priority: 'medium',
      dueDate: format(new Date(), 'yyyy-MM-dd')
    });
    setIsFormVisible(false);
  };

  const startEdit = (task) => {
    setEditingTask(task);
    setNewTask({ 
      title: task.title, 
      description: task.description, 
      priority: task.priority,
      dueDate: task.dueDate || format(new Date(), 'yyyy-MM-dd')
    });
    setIsFormVisible(true);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    reorderTasks(result.source.index, result.destination.index);
  };

  const filteredTasks = tasks.filter(task => {
    switch(filter) {
      case 'completed':
        return task.completed;
      case 'pending':
        return !task.completed;
      default:
        return true;
    }
  });

  return (
    <div className="tasks-page">
      <div className="tasks-header">
        <h1>Tasks</h1>
        <div className="tasks-controls">
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Tasks</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
          <button 
            className="add-task-button"
            onClick={() => setIsFormVisible(!isFormVisible)}
          >
            {isFormVisible ? '− Close Form' : '+ Add Task'}
          </button>
        </div>
      </div>
      
      <form 
        onSubmit={handleSubmit} 
        className={`task-form ${isFormVisible ? 'visible' : ''}`}
      >
        <input
          type="text"
          placeholder="Task title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          required
        />
        <textarea
          placeholder="Task description"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
        />
        <select
          value={newTask.priority}
          onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
        <input
          type="date"
          value={newTask.dueDate}
          onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
        />
        <button type="submit">
          {editingTask ? 'Update Task' : 'Add Task'}
        </button>
      </form>

      {/* ✅ Quote Display Section */}
      <div className="motivation-quote">
        <h2 key={quoteIndex}>{motivationalQuotes[quoteIndex]}</h2>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="tasks">
          {(provided) => (
            <div 
              className="tasks-list"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {filteredTasks.map((task, index) => (
                <Draggable 
                  key={task.id} 
                  draggableId={task.id.toString()} 
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`task-card ${task.completed ? 'completed' : ''}`}
                    >
                      <div className="task-header">
                        <h3 className={task.completed ? 'completed-title' : ''}>
                          {task.title}
                        </h3>
                        <span className={`priority ${task.priority}`}>
                          {task.priority}
                        </span>
                      </div>
                      <p>{task.description}</p>
                      <p className="due-date">Due: {formatDate(task.dueDate)}</p>
                      <div className="task-actions">
                        <button onClick={() => toggleTask(task.id)}>
                          {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
                        </button>
                        <button onClick={() => startEdit(task)}>Edit</button>
                        <button onClick={() => deleteTask(task.id)}>Delete</button>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default Tasks;
