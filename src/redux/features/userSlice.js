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
    initialState: null,
    reducers: {
        // fetchUserInfo: async (state, action) => {
        //     const { payload: uid } = action;
        //     //fetching data of loggedin user
        //     const docRef = doc(db, "users", uid);
        //     const docSnap = await getDoc(docRef);
        //     if (docSnap.exists()) {
        //         console.log(docSnap.data());
        //     } else {
        //         console.log("document doesn't exist!");
        //     }
        // },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUserInfo.fulfilled, (state, action) => {
            return action.payload;
        });
        builder.addCase(fetchUserInfo.rejected, (state, action) => {});
        builder.addCase(fetchUserInfo.pending, (state, action) => {});
    },
});

export const userReducer = userSlice.reducer;
//export const { fetchUserInfo } = userSlice.actions;
