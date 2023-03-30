import { configureStore } from "@reduxjs/toolkit";
import todosSlice from "../slices/todosSlice";
import themeSlice from "../slices/themeSlice";
import eventSlice from "../slices/eventSlice";

const store = configureStore({
    reducer: {
        todos: todosSlice,
        theme: themeSlice.reducer,
        event: eventSlice.reducer,
    },
});

export default store;
