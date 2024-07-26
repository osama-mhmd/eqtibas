import { configureStore } from "@reduxjs/toolkit";
import imageReducer from "./slices/image";

const store = configureStore({
  reducer: {
    image: imageReducer,
  },
});

export default store;
