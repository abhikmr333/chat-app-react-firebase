import { createSlice } from "@reduxjs/toolkit";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { createAsyncThunk } from "@reduxjs/toolkit";

//Action which will handle the firebase requests
export const fetchUserInfo = createAsyncThunk("fetchUserInfo", async (uid) => {
    //fetching data of logged in user
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : null;
});

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
        blockReceiver: (state, action) => {
            const recieverId = action.payload;
            state.currentUser.blockList.push(recieverId);
        },
    },
    extraReducers: (builder) => {
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
    },
});

export const userReducer = userSlice.reducer;
export const { deleteUser } = userSlice.actions;
