import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  isEditing: false,
  currentId: "",
};

const bookingSlice = createSlice({
  name: "notify",
  initialState,
  reducers: {
    onEditing: (state, actions) => {
      state.isEditing = true
      state.currentId = actions.payload
    },
    afterEditing: (state, actions) => {
      state.isEditing = false
      state.currentId = "" 
    }
  },
});

export const { onEditing, afterEditing } = bookingSlice.actions;
export default bookingSlice.reducer;
