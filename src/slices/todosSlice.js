import { createSlice } from '@reduxjs/toolkit';
import { initialTodos, tags } from '../data/initialState.js';
import { format } from 'date-fns';

const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: initialTodos,
    tags,
    selectedTag: '',
    isHide: false,
    newDate: null,
  },
  reducers: {
    setDate: (state, action) => {
      state.newDate = action.payload
        ? format(new Date(action.payload), 'yyyy-MM-dd')
        : 'yyyy-MM-dd';
    },
    addTodo: (state, action) => {
      const newTodo = {
        ...action.payload,
        id: state.todos.length + 1,
        done: false,
        date: state.newDate,
      };
      state.todos.push(newTodo);
      console.log(state.todos);
    },
    updateTodo: (state, action) => {
      const updateIdx = state.todos.findIndex(
        (todo) => todo.id === action.payload.id
      );
      if (updateIdx > -1) {
        state.todos.splice(updateIdx, 1, action.payload);
      }
    },
    deleteTodo: (state, action) => {
      const id = action.payload;
      state.todos = state.todos.filter((todo) => todo.id !== id);
    },
    tagHandler: (state, action) => {
      const label = action.payload;
      state.selectedTag = label;
    },
    tagFilterHandler: (state) => {
      state.todos = initialTodos.filter((el) => el.tag === state.selectedTag);
    },
    isHideHandler: (state) => {
      state.isHide = false;
    },
    doneFilterHandler: (state) => {
      state.isHide = !state.isHide;
      if (state.isHide) {
        state.todos = state.todos.filter((el) => el.done === false);
      } else {
        state.todos = state.selectedTag
          ? initialTodos.filter((el) => el.tag === state.selectedTag)
          : initialTodos;
      }
    },
    resetHandler: (state) => {
      state.todos = initialTodos;
      state.selectedTag = '';
    },
  },
});
export const {
  setDate,
  addTodo,
  updateTodo,
  deleteTodo,
  tagHandler,
  resetHandler,
  tagFilterHandler,
  doneFilterHandler,
  isHideHandler,
} = todosSlice.actions;

export default todosSlice.reducer;
