import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  userRole: "",
  isLoggedIn: false,
  userID: "",
};

//What is createSlice in Redux Toolkit?
//createSlice is a higher order function that accepts an initial state, an object full of reducer functions and a slice name.

// In Redux-Toolkit, the createSlice method helps us create a slice of the redux-store.
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    assignUserValues: (state, actions) => {
      state.userRole = actions.payload.userRole;
      state.userID = actions.payload.userID;
    },
    switchLogin: (state, actions) => {
      state.isLoggedIn = !state.isLoggedIn;
    },
  },
});

export const { assignUserRole, switchLogin } = userSlice.actions;
export default userSlice.reducer;
