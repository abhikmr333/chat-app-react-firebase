import { createSlice } from "@reduxjs/toolkit";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";

const userSlice = createSlice({
    name: "userSlice",
    initialState: null,
    reducers: {
        fetchUserInfo: async (state, action) => {
            const { payload: uid } = action;
            //fetching data of loggedin user
            const docRef = doc(db, "users", uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                return docSnap.data();
            } else {
                console.log("document doesn't exist!");
            }
        },
    },
});

export const userReducer = userSlice.reducer;
export const { fetchUserInfo } = userSlice.actions;
