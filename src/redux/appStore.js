import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./features/userSlice";
import { chatReducer } from "./features/chatSlice";

const appStore = configureStore({
    reducer: {
        user: userReducer,
        chat: chatReducer,
    },
});

export default appStore;
