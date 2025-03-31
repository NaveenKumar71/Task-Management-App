import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function EditTaskModal({ show, onHide, task, onSave }) {
  const [editedTask, setEditedTask] = useState(task);

  useEffect(() => {
    setEditedTask(task);
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTask(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editedTask);
    onHide();
  };

  if (!editedTask) return null;

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Task</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group controlId="editTaskTitle" className="mb-3">
            <Form.Label>Task Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={editedTask.title}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="editTaskDescription" className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              value={editedTask.description}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="editTaskDueDate" className="mb-3">
            <Form.Label>Due Date</Form.Label>
            <Form.Control
              type="date"
              name="dueDate"
              value={editedTask.dueDate}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="editTaskPriority" className="mb-3">
            <Form.Label>Priority</Form.Label>
            <Form.Select
              name="priority"
              value={editedTask.priority}
              onChange={handleChange}
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default EditTaskModal;
