import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  message: "",
  status: 0,
  description: "",
  display: false
};

const toastSlice = createSlice({
  name: "notify",
  initialState,
  reducers: {
    assignToast: (state, actions) => {
      state.message = actions.payload.message;
      state.status = actions.payload.status;
      state.description = actions.payload.description;
      state.display = true
    },
    clearToast: (state, actions) => {
      state.message = ""
      state.status = 0
      state.description = ""
      state.display = false
    }
  },
});

export const { assignToast, clearToast } = toastSlice.actions;
export default toastSlice.reducer;
