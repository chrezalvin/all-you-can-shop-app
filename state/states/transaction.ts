import { Transaction } from "@models";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Transaction[] = [];

export const transactionSlice = createSlice({
    name: "transaction",
    initialState,
    reducers: {
        setNewTransaction: (state, action: PayloadAction<Transaction>) => {
            state.push(action.payload);
        },
        setTransaction: (state, action: PayloadAction<Transaction[]>) => {
            return action.payload;
        },
    },
});

export const { setNewTransaction, setTransaction } = transactionSlice.actions;

export const selectTransaction = (state: {transaction: Transaction[]}) => state.transaction;

export default transactionSlice.reducer;