import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
    name: "themeSlice",
    initialState: {
        currentTheme: "light",
    },
    reducers: {
        switchTheme: (state) => {
            state.currentTheme = state.currentTheme === "light" ? "dark" : "light";
        },
    },
});

export const { switchTheme } = themeSlice.actions;
export const themeReducer = themeSlice.reducer;
