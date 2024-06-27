import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TodoForm from './pages/TodoForm';
import TodoTable from './pages/TodoTable';
import { addTodo, deleteTodo, editTodo, toggleCompletion } from './pages/todosSlice';

const App = () => {
  const todos = useSelector(state => state.todos);
  const dispatch = useDispatch();

  const handleAddTodo = (data) => {
    dispatch(addTodo({
      id: Date.now(),
      ...data,
      isCompleted: false,
    }));
  };

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleEditTodo = (id, updatedTodo) => {
    dispatch(editTodo({ id, updatedTodo }));
  };

  const handleToggleCompletion = (id, isCompleted) => {
    dispatch(toggleCompletion({ id, isCompleted }));
  };

  return (
    <div>
      <h1>Todo List</h1>
      <TodoForm onSubmit={handleAddTodo} />
      <TodoTable
        todos={todos}
        onDeleteTodo={handleDeleteTodo}
        onEditTodo={handleEditTodo}
        onToggleCompletion={handleToggleCompletion}
      />
    </div>
  );
};

export default App;
