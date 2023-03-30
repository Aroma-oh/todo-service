import { createSlice } from "@reduxjs/toolkit";
import { initialTodos, tags } from "../data/initialState.js";

const todosSlice = createSlice({
    name: "todos",
    initialState: {
        todos: initialTodos,
        tags,
        selectedTag: "",
        isHide: false,
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
            state.todos = initialTodos.filter(
                (el) => el.tag === state.selectedTag
            );
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
            state.selectedTag = "";
        },
    },
});
export const {
    addTodo,
    updateTodo,
    deleteTodo,
    tagHandler,
    resetHandler,
    tagFilterHandler,
    doneFilterHandler,
} = todosSlice.actions;

export default todosSlice.reducer;
