import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./features/userSlice";
import { chatReducer } from "./features/chatSlice";
import { themeReducer } from "./features/themeSlice";

const appStore = configureStore({
    reducer: {
        user: userReducer,
        chat: chatReducer,
        theme: themeReducer,
    },
});

export default appStore;
