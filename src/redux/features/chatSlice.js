import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
    name: "chatSlice",
    initialState: {
        chatIdOfCurrentConversation: null,
        user: null,
        isCurrentUserBlocked: false,
        isReceiverBlocked: false,
    },
    reducers: {
        //chat-view will change everytime a different user gets clicked
        changeChatView: (state, action) => {
            const { chatId, userData, currentUser } = action.payload;
            //current-user has blocked the user(the one you clicked on)
            if (currentUser.blockList.includes(userData.id)) {
                state.chatIdOfCurrentConversation = chatId;
                state.user = userData;
                state.isCurrentUserBlocked = false;
                state.isReceiverBlocked = true;
            }
            //user has blocked current user
            else if (userData.blockList.includes(currentUser.id)) {
                state.chatIdOfCurrentConversation = chatId;
                state.user = userData;
                state.isCurrentUserBlocked = true;
                state.isReceiverBlocked = false;
            }
            //no one is blocked
            else {
                state.chatIdOfCurrentConversation = chatId;
                state.user = userData;
                state.isCurrentUserBlocked = false;
                state.isReceiverBlocked = false;
            }
        },
        //reset/delete whenever user logouts
        removeCurrentReceiver: (state) => {
            state.chatIdOfCurrentConversation = null;
            state.user = null;
            state.isCurrentUserBlocked = false;
            state.isReceiverBlocked = false;
        },
        //if current user blocks someone
        changeBlock: (state) => {
            return { ...state, isReceiverBlocked: !state.isReceiverBlocked };
        },
    },
});

export const { changeChatView, removeCurrentReceiver, changeBlock } = chatSlice.actions;
export const chatReducer = chatSlice.reducer;
