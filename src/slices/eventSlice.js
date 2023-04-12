import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen: false,
    target: null,
    type: "create",
    isOpenCalendar: false,
};

const eventSlice = createSlice({
    name: "event",
    initialState,
    reducers: {
        openModal: (state, action) => {
            state.isOpen = !state.isOpen;
            state.target = action.payload ?? null;
        },
        modalType: (state, action) => {
            state.type = action.payload ?? "create";
        },
        openCalendar: (state) => {
            state.isOpenCalendar = !state.isOpenCalendar;
        },
    },
});

export const { openModal, modalType, hideDoneTask, openCalendar } =
    eventSlice.actions;
export default eventSlice;
