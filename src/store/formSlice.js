// formSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    addData: (state, action) => {
      state.data.push(action.payload);
    },
    deleteData: (state, action) => {
      state.data = state.data.filter((item) => item.id !== action.payload);
    },
    updateData: (state, action) => {
      const { id, updatedValue } = action.payload;

      console.log(id, updatedValue);

      state.data.forEach((item) => {
        if (item.id === id) {
          item.email = updatedValue.email;
          item.name = updatedValue.name;
          item.img = updatedValue.img;
        }
      });
    },
  },
});

export const { addData, deleteData, updateData } = formSlice.actions;

export default formSlice.reducer;
