import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quote: "",
  background: "bg-purple-950", // written in tailwind
};

const canvasSlice = createSlice({
  name: "image",
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
