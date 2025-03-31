import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import FilterSort from './components/FilterSort';
import DarkModeToggle from './components/DarkModeToggle';
import EditTaskModal from './components/EditTaskModal';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all'); // Options: all, pending, completed
  const [sort, setSort] = useState('none'); // Options: none, dueDate, priority
  const [darkMode, setDarkMode] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  // Load tasks from localStorage when the app mounts
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      try {
        setTasks(JSON.parse(storedTasks));
      } catch (error) {
        console.error('Error parsing tasks from localStorage:', error);
      }
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addOrUpdateTask = (task) => {
    if (task.id) {
      // Update existing task
      setTasks(tasks.map(t => (t.id === task.id ? task : t)));
    } else {
      // Add new task with a unique id
      task.id = Date.now();
      setTasks([...tasks, task]);
    }
    setTaskToEdit(null);
    setShowEditModal(false);
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const reorderTasks = (newOrder) => {
    setTasks(newOrder);
  };

  const editTask = (task) => {
    setTaskToEdit(task);
    setShowEditModal(true);
  };

  const saveEditedTask = (editedTask) => {
    setTasks(tasks.map(t => (t.id === editedTask.id ? editedTask : t)));
    setShowEditModal(false);
    setTaskToEdit(null);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={darkMode ? 'app dark-mode' : 'app'}>
        <div className="container py-4">
          <header className="d-flex justify-content-between align-items-center mb-4">
            <div className="logo">
              <h1 className="logo-text">
                <span className="logo-task">Task</span>{' '}
                <span className="logo-management">Management</span>
              </h1>
            </div>
            <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
          </header>
          <div className="row">
            <div className="col-md-4">
              <TaskForm addOrUpdateTask={addOrUpdateTask} darkMode={darkMode} />
            </div>
            <div className="col-md-8">
              <FilterSort
                filter={filter}
                setFilter={setFilter}
                sort={sort}
                setSort={setSort}
              />
              <TaskList
                tasks={tasks}
                filter={filter}
                sort={sort}
                toggleTask={toggleTask}
                deleteTask={deleteTask}
                editTask={editTask}
                reorderTasks={reorderTasks}
              />
            </div>
          </div>
          {showEditModal && taskToEdit && (
            <EditTaskModal
              show={showEditModal}
              onHide={() => setShowEditModal(false)}
              task={taskToEdit}
              onSave={saveEditedTask}
            />
          )}
        </div>
      </div>
    </DndProvider>
  );
}

export default App;
