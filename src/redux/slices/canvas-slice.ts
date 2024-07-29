import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quote: "",
  background: "#333333",
  theme: "no-effect",
  image: "", // background-image
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
  },
});

export const { writeQuote, changeBackground, changeTheme, changeImage } =
  canvasSlice.actions;

export default canvasSlice.reducer;
