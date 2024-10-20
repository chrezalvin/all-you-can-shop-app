import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import languageList from "@assets/languages.json";

type Language = typeof languageList[number];
export interface LanguageState{
    language: Language;
}

const initialState: LanguageState = {
    language: languageList[0]
};

export const languageSlice = createSlice({
    name: "language",
    initialState,
    reducers: {
        setLanguageById: (state, action: PayloadAction<string>) => {
            const find = languageList.find((val) => val.id === action.payload);
            console.log(find);

            state.language = find ?? languageList[0];
        }
    },
});

export const { setLanguageById } = languageSlice.actions;

export const selectLanguage = (state: {language: LanguageState}) => state.language.language;

export default languageSlice.reducer;