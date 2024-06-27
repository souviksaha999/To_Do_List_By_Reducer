import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTodo, editTodo, toggleCompletion } from './todosSlice';

const TodoTable = ({ todos }) => {
  const dispatch = useDispatch();
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editEndDate, setEditEndDate] = useState('');

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleEdit = (id, title, description, endDate) => {
    setEditId(id);
    setEditTitle(title);
    setEditDescription(description);
    setEditEndDate(endDate);
  };

  const handleEditInputChange = (event, field) => {
    const value = event.target.value;
    switch (field) {
      case 'title':
        setEditTitle(value);
        break;
      case 'description':
        setEditDescription(value);
        break;
      case 'endDate':
        setEditEndDate(value);
        break;
      default:
        break;
    }
  };

  const handleEditSubmit = (id) => {
    dispatch(
      editTodo({
        id,
        updatedTodo: {
          title: editTitle,
          description: editDescription,
          endDate: editEndDate,
        },
      })
    );
    setEditId(null);
    setEditTitle('');
    setEditDescription('');
    setEditEndDate('');
  };

  const handleToggle = (id, isCompleted) => {
    dispatch(toggleCompletion({ id, isCompleted: !isCompleted }));
  };

  const renderEditField = (id, title, description, endDate) => {
    if (editId === id) {
      return (
        <>
          <td style={tableCellStyle}>
            <input
              type="text"
              value={editTitle}
              onChange={(e) => handleEditInputChange(e, 'title')}
              style={{ marginRight: '5px' }}
            />
          </td>
          <td style={tableCellStyle}>
            <input
              type="text"
              value={editDescription}
              onChange={(e) => handleEditInputChange(e, 'description')}
              style={{ marginRight: '5px' }}
            />
          </td>
          <td style={tableCellStyle}>
            <input
              type="text"
              value={editEndDate}
              onChange={(e) => handleEditInputChange(e, 'endDate')}
              style={{ marginRight: '5px' }}
            />
          </td>
          <td style={tableCellStyle}>
            <button onClick={() => handleEditSubmit(id)} style={buttonStyle}>
              Change
            </button>
          </td>
        </>
      );
    } else {
      return (
        <>
          <td style={tableCellStyle}>{title}</td>
          <td style={tableCellStyle}>{description}</td>
          <td style={tableCellStyle}>{new Date(endDate).toLocaleDateString()}</td>
        </>
      );
    }
  };

  return (
    <div>
      <h2 style={{ marginBottom: '20px' }}>Todo List</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #ddd' }}>
            <th style={tableHeaderStyle}>Title</th>
            <th style={tableHeaderStyle}>Description</th>
            <th style={tableHeaderStyle}>End Date</th>
            <th style={tableHeaderStyle}>Is Completed</th>
            <th style={tableHeaderStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.id} style={{ borderBottom: '1px solid #ddd' }}>
              {renderEditField(todo.id, todo.title, todo.description, todo.endDate)}
              <td style={tableCellStyle}>
                <input
                  type="checkbox"
                  checked={todo.isCompleted}
                  onChange={() => handleToggle(todo.id, todo.isCompleted)}
                  style={{ cursor: 'pointer' }}
                />
              </td>
              <td style={tableCellStyle}>
                {editId !== todo.id && (
                  <button onClick={() => handleEdit(todo.id, todo.title, todo.description, todo.endDate)} style={buttonStyle}>
                    Edit
                  </button>
                )}
                <button onClick={() => handleDelete(todo.id)} style={{ ...buttonStyle, backgroundColor: '#f44336' }}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const tableHeaderStyle = {
  padding: '10px',
  textAlign: 'left',
  backgroundColor: '#f2f2f2',
  borderBottom: '1px solid #ddd',
};

const tableCellStyle = {
  padding: '10px',
  borderBottom: '1px solid #ddd',
};

const buttonStyle = {
  backgroundColor: '#4CAF50',
  color: 'white',
  padding: '8px 12px',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  marginRight: '5px',
};

export default TodoTable;
