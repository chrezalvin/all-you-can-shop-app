import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface MoneyState {
    amount: number | null;
}

const initialState: MoneyState = {
    amount: null
};

export const moneySlice = createSlice({
    name: "money",
    initialState,
    reducers: {
        setMoney: (state, action: PayloadAction<number>) => {
            state.amount = action.payload;
        }
    },
});

export const { setMoney } = moneySlice.actions;

export const selectMoney = (state: {money: MoneyState}) => state.money.amount;

export default moneySlice.reducer;