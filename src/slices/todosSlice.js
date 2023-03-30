import { createSlice } from "@reduxjs/toolkit";
import { initialTodos, tags } from "../data/initialState.js";

const todosSlice = createSlice({
    name: "todos",
    initialState: {
        todos: initialTodos,
        tags,
        selectedTag: "",
    },
    reducers: {
        addTodo: (state, action) => {
            const newTodo = {
                ...action.payload,
                id: state.todos.length + 1,
                done: false,
                date: new Date().toISOString(),
            };
            state.todos.push(newTodo);
        },
        updateTodo: (state, action) => {
            const todoToUpdate = state.todos.filter(
                (todo) => todo.id === action.payload.id
            );
            if (todoToUpdate)
                return {
                    ...todoToUpdate,
                    ...action.payload,
                };
        },
        deleteTodo: (state, action) => {
            const { id } = action.payload;
            state = state.todos.filter((todo) => todo.id !== id);
        },
        tagHandler: (state, action) => {
            // 여기 모르겠당 합치는게 맞나?
            const label = action.payload;
            state.selectedTag = label;
            state.todos = initialTodos.todos.filter((el) => el.tag === label);
        },
    },
});

export const { addTodo, updateTodo, deleteTodo, tagHandler } =
    todosSlice.actions;

export default todosSlice.reducer;
