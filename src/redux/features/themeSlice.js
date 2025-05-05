import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
    name: "themeSlice",
    initialState: {
        currentTheme: "light",
    },
});
