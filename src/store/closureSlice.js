import { createSlice } from "@reduxjs/toolkit";

export const closureSlice = createSlice({
  name: "closure",
  initialState: {
    username: null,
  },
  reducers: {
    setUsername: (state, action) => {
      if (!action.payload) {
        console.error("Username is a falsy value");
        return;
      }

      console.log(
        "setUsername action dispatched with payload:",
        action.payload
      );
      state.username = action.payload;
    },
  },
});

export const { setUsername } = closureSlice.actions;

export default closureSlice.reducer;
