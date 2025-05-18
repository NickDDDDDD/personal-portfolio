import { configureStore } from "@reduxjs/toolkit";
import closureReducer from "./closureSlice";

export default configureStore({
  reducer: {
    closure: closureReducer,
  },
});
