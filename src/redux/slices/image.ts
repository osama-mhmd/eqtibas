import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quote: "",
  background: "#111",
};

const imageSlice = createSlice({
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

export const { writeQuote, changeBackground } = imageSlice.actions;

export default imageSlice.reducer;
