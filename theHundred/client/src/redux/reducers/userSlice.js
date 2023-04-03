import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  userRole: "",
  isLoggedIn: false,
  userID: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, actions) => {
      state.userRole = actions.payload.userRole;
      state.userID = actions.payload.userID;
      state.isLoggedIn = true
    },
    logoutUser: (state, actions) => {
      state.isLoggedIn = false;
      state.userRole = "";
      state.userID = "";
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
