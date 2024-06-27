import { createSlice } from '@reduxjs/toolkit';

const todosSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    
    addTodo: (state, action) => {
      state.push(action.payload);
    },
    
    deleteTodo: (state, action) => {
      return state.filter(todo => todo.id !== action.payload);
    },
    
    editTodo: (state, action) => {
      const { id, updatedTodo } = action.payload;
      const todoIndex = state.findIndex(todo => todo.id === id);
      if (todoIndex !== -1) {
        state[todoIndex] = { ...state[todoIndex], ...updatedTodo };
      }
    },
    
    toggleCompletion: (state, action) => {
      const { id, isCompleted } = action.payload;
      const todo = state.find(todo => todo.id === id);
      if (todo) {
        todo.isCompleted = isCompleted;
      }
    }
  }
});

export const { addTodo, deleteTodo, editTodo, toggleCompletion } = todosSlice.actions;
export default todosSlice.reducer;
