import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quote: "",
  background: "default-background", // #111
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
  },
});

export const { writeQuote, changeBackground } = canvasSlice.actions;

export default canvasSlice.reducer;
