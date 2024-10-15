import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TransactionState {
    id: string;
    date: string;
    amount: number;
    finished: boolean;
    info: string;
}

const initialState: TransactionState[] = [];

export const transactionSlice = createSlice({
    name: "transaction",
    initialState,
    reducers: {
        setNewTransaction: (state, action: PayloadAction<TransactionState>) => {
            state.push(action.payload);
        },
        setTransaction: (state, action: PayloadAction<TransactionState[]>) => {
            return action.payload;
        },
    },
});

export const { setNewTransaction, setTransaction } = transactionSlice.actions;

export const selectTransaction = (state: {transaction: TransactionState[]}) => state.transaction;

export default transactionSlice.reducer;