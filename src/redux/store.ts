import { configureStore } from "@reduxjs/toolkit";
import canvasReducer from "./slices/canvas-slice";

const store = configureStore({
  reducer: {
    canvas: canvasReducer,
  },
});

export default store;
