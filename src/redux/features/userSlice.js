import { createSlice } from "@reduxjs/toolkit";
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { createAsyncThunk } from "@reduxjs/toolkit";

//Action which will handle the firebase requests
export const fetchUserInfo = createAsyncThunk("fetchUserInfo", async (uid) => {
    //fetching data of logged in user
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : null;
});
//Blocking user updating firebase(return recieverId to update blocklist in state manually)
export const blockReceiver = createAsyncThunk(
    "blockReceiver",
    async ({ currentUserId, receiverId }) => {
        const docRef = doc(db, "users", currentUserId);
        await updateDoc(docRef, {
            blockList: arrayUnion(receiverId),
        });
        return receiverId;
    }
);
//unblocking user updating firebase(return recieverId to update blocklist in state manually)
export const unblockReceiver = createAsyncThunk(
    "unblockReceiver",
    async ({ currentUserId, receiverId }) => {
        const docRef = doc(db, "users", currentUserId);
        await updateDoc(docRef, {
            blockList: arrayRemove(receiverId),
        });
        return receiverId;
    }
);

const userSlice = createSlice({
    name: "userSlice",
    initialState: {
        isLoading: false,
        currentUser: null,
        isError: false,
    },
    reducers: {
        deleteUser: (state) => {
            state.currentUser = null;
            state.isLoading = false;
            state.isError = false;
        },
    },
    extraReducers: (builder) => {
        //fetchUserInfo
        builder.addCase(fetchUserInfo.fulfilled, (state, action) => {
            state.isLoading = false;
            state.currentUser = action.payload;
        });
        builder.addCase(fetchUserInfo.rejected, (state, action) => {
            console.log("Error: ", action);
            state.isError = true;
        });
        builder.addCase(fetchUserInfo.pending, (state) => {
            state.isLoading = true;
        });

        //blockReceiver
        builder.addCase(blockReceiver.fulfilled, (state, action) => {
            const receiverId = action.payload;
            state.currentUser.blockList.push(receiverId);
        });
        //unblockReceiver
        builder.addCase(unblockReceiver.fulfilled, (state, action) => {
            const blockList = state.currentUser.blockList;
            const receiverId = action.payload;
            state.currentUser.blockList = blockList.filter((userId) => userId !== receiverId);
        });
    },
});

export const userReducer = userSlice.reducer;
export const { deleteUser } = userSlice.actions;
