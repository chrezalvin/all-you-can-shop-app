import { createSlice } from "@reduxjs/toolkit";

export interface AttemptState {
    attempt: number;
}

const initialState: AttemptState = {
    attempt: 0
};

export const attemptSlice = createSlice({
    name: "attempt",
    initialState,
    reducers: {
        addAttempt: (state) => {
            state.attempt += 1;
        },
        resetAttempt: (state) => {
            state.attempt = 0;
        }
    },
});

export const { addAttempt, resetAttempt } = attemptSlice.actions;

export const selectAttempt = (state: {attempt: AttemptState}) => state.attempt.attempt;

export default attemptSlice.reducer;