import React from 'react';
import { useDrag, useDrop } from 'react-dnd';

const ItemTypes = {
  TASK: 'task',
};

function TaskItem({ task, index, toggleTask, deleteTask, editTask, tasks, reorderTasks }) {
  const ref = React.useRef(null);

  // Set up the drop target for drag-and-drop reordering
  const [, drop] = useDrop({
    accept: ItemTypes.TASK,
    hover(item, monitor) {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;

      // Get the bounding rectangle and compute the middle Y value
      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      // Perform reordering
      const updatedTasks = [...tasks];
      const draggedTask = updatedTasks[dragIndex];
      updatedTasks.splice(dragIndex, 1);
      updatedTasks.splice(hoverIndex, 0, draggedTask);
      reorderTasks(updatedTasks);

      // Update the index for the dragged item
      item.index = hoverIndex;
    },
  });

  // Set up the drag source
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.TASK,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className="card mb-3 task-item"
      style={{ opacity: isDragging ? 0.5 : 1, cursor: 'move' }}
    >
      {/* Card Header: Task Title & "Mark as Completed" Button */}
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5 className="card-title mb-0" style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
          {task.title}
        </h5>
        <div>
          {task.completed ? (
            <button className="btn btn-success btn-sm me-2" disabled>
              Completed
            </button>
          ) : (
            <button
              className="btn btn-outline-primary btn-sm me-2"
              onClick={() => toggleTask(task.id)}
            >
              Mark as Completed
            </button>
          )}
        </div>
      </div>
      
      {/* Card Body: Description & Task Details */}
      <div className="card-body">
        <p className="card-text" style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
          {task.description}
        </p>
        <p className="card-text">
          <small className="text-muted">
            Due: {task.dueDate} | Priority: {task.priority}
          </small>
        </p>
      </div>
      
      {/* Card Footer: Edit & Delete Buttons */}
      <div className="card-footer d-flex justify-content-end">
        <button className="btn btn-warning btn-sm me-2" onClick={() => editTask(task)}>
          Edit
        </button>
        <button className="btn btn-danger btn-sm" onClick={() => deleteTask(task.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskItem;
