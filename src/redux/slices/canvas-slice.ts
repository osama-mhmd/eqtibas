import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quote: "",
  background: "bg-gray-800", // #111
  theme: "no-effect",
};

const canvasSlice = createSlice({
  name: "canvas",
  initialState,
  reducers: {
    writeQuote: (state, action) => {
      state.quote = action.payload;
    },
    changeBackground: (state, action) => {
      state.background = action.payload;
    },
    changeTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
});

export const { writeQuote, changeBackground, changeTheme } =
  canvasSlice.actions;

export default canvasSlice.reducer;
