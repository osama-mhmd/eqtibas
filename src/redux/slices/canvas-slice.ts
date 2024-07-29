import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quote: "",
  background: "#333333",
  theme: "no-effect",
  image: "", // background-image => gradient image ||| image = src()
  family: "ibm",
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
      state.image = "";
    },
    changeTheme: (state, action) => {
      state.theme = action.payload;
    },
    changeImage: (state, action) => {
      state.image = action.payload;
      state.background = "";
    },
    changeFamily: (state, action) => {
      state.family = action.payload;
    },
  },
});

export const {
  writeQuote,
  changeBackground,
  changeTheme,
  changeImage,
  changeFamily,
} = canvasSlice.actions;

export default canvasSlice.reducer;
