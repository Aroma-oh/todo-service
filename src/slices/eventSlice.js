import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen: false,
    selectedTag: "",
    hideDoneTask: false,
};

const eventSlice = createSlice({
    name: "event",
    initialState,
    reducers: {
        openModal: (state, action) => {
            state.isOpen = !state.isOpen;
        },
        hideDoneTask: (state) => {
            state.hideDoneTask = state.hideDoneTask;
        },
    },
});

export const { openModal, hideDoneTask } = eventSlice.actions;
export default eventSlice;
