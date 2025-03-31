import React from 'react';
import TaskItem from './TaskItem';

function TaskList({ tasks, filter, sort, toggleTask, deleteTask, editTask, reorderTasks }) {
  // Filter tasks based on their completion status
  let filteredTasks = tasks;
  if (filter === 'pending') {
    filteredTasks = tasks.filter((task) => !task.completed);
  } else if (filter === 'completed') {
    filteredTasks = tasks.filter((task) => task.completed);
  }

  // Optionally, sort tasks based on dueDate or priority
  if (sort === 'dueDate') {
    filteredTasks = [...filteredTasks].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  } else if (sort === 'priority') {
    const priorityOrder = { High: 1, Medium: 2, Low: 3 };
    filteredTasks = [...filteredTasks].sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
  }

  return (
    <div className="list-group">
      {filteredTasks.length === 0 ? (
        <p className="text-center">No tasks to display.</p>
      ) : (
        filteredTasks.map((task, index) => (
          <TaskItem
            key={task.id}
            task={task}
            index={index}
            toggleTask={toggleTask}
            deleteTask={deleteTask}
            editTask={editTask}
            tasks={filteredTasks}
            reorderTasks={reorderTasks}
          />
        ))
      )}
    </div>
  );
}

export default TaskList;
