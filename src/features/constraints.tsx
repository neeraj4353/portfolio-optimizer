// @ts-nocheck
import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    clientID: 1,
    risk: "balanced",
    constraints: [
      {
        product: "Global Bonds (Unhedged)",
        percentage: 0.1,
      },
      {
        product: "Total US Bond Market",
        percentage: 0.1,
      },
    ],
  },
  {
    clientID: 2,
    risk: "aggressive",
    constraints: [
      {
        product: "US Small Cap Growth",
        percentage: 0.1,
      },
    ],
  },
  {
    clientID: 3,
    risk: "conservative",
    constraints: [
      {
        product: "US Large Cap Growth",
        percentage: 0.1,
      },
      {
        product: "Global Bonds (Unhedged)",
        percentage: 0.1,
      },
    ],
  },
];

export const AddConstraintsSlice = createSlice({
  name: "constraints",
  initialState,
  reducers: {
    add: (state, { payload }) => {
      state.push({
        ...payload?.view,
        clientId: payload?.clientId,
        id: new Date().getTime(),
      });
    },
    reset: (state) => {
      state = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { add, reset } = AddConstraintsSlice.actions;

export default AddConstraintsSlice.reducer;
