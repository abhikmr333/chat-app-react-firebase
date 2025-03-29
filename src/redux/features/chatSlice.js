import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const chatSlice = createSlice({
    name: "chatSlice",
    initialState: {
        chatIdOfCurrentConversation: null,
        user: null,
        isCurrentUserBlocked: false,
        isUserBlocked: false,
    },
    reducers: {
        //chat-view will change everytime a different user gets clicked
        changeChatView: (state, action) => {
            const { chatId, userData, currentUser } = action.payload;
            //current-user has blocked the user(the one you clicked on)
            if (currentUser.blockList.includes(userData.id)) {
                state.chatIdOfCurrentConversation = chatId;
                state.user = null;
                state.isCurrentUserBlocked = false;
                state.isUserBlocked = true;
            }
            //user has blocked current user
            else if (userData.blockList.includes(currentUser.id)) {
                state.chatIdOfCurrentConversation = chatId;
                state.user = null;
                state.isCurrentUserBlocked = true;
                state.isUserBlocked = false;
            }
            //no one is blocked
            else {
                state.chatIdOfCurrentConversation = chatId;
                state.user = userData;
                state.isCurrentUserBlocked = false;
                state.isUserBlocked = false;
            }
        },
        //reset/delete whenever user logouts
        removeCurrentReceiver: (state) => {
            state.chatIdOfCurrentConversation = null;
            state.user = null;
            state.isCurrentUserBlocked = false;
            state.isUserBlocked = false;
        },
    },
});

export const { changeChatView, removeCurrentReceiver } = chatSlice.actions;
export const chatReducer = chatSlice.reducer;
