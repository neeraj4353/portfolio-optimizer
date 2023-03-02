// @ts-nocheck
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AddViewState {
  type: string;
  description: string;
  clientID: number;
}

const initialState = [
  {
    clientID: 1,
    risk: "balanced",
    type: "Absolute",
    isConfidence: true,
    confidenceLevel: 95,
    description:
      "Intl Developed ex-US Market will have an absolute excess return of 5.5%",
    product: "Intl Developed ex-US Market",
    movement: "up",
    percentage: 5.5,
  },
  {
    clientID: 1,
    risk: "balanced",
    type: "Absolute",
    isConfidence: false,
    confidenceLevel: 70,
    description:
      "Intl Developed ex-US Market will have an absolute excess return of 5.5%",
    product: "Intl Developed ex-US Market",
    movement: "up",
    percentage: 5.5,
  },
  {
    clientID: 2,
    risk: "aggressive",
    type: "Absolute",
    isConfidence: false,
    confidenceLevel: 60,
    description:
      "US Small Cap Growth will have an absolute excess return of 4%",
    product: "US Small Cap Growth",
    movement: "up",
    percentage: 4,
  },
  {
    clientID: 2,
    risk: "aggressive",
    type: "Absolute",
    isConfidence: false,
    confidenceLevel: 90,
    description:
      "Emerging Markets will have an absolute excess return of 9.25%",
    product: "Emerging Markets",
    movement: "up",
    percentage: 9.25,
  },
  {
    clientID: 3,
    risk: "conservative",
    type: "Absolute",
    isConfidence: false,
    confidenceLevel: 80,
    description:
      "US Large Cap Growth will have an absolute excess return of 5%",
    product: "US Large Cap Growth",
    movement: "up",
    percentage: 5,
  },
  {
    clientID: 3,
    risk: "conservative",
    type: "Relative",
    isConfidence: false,
    confidenceLevel: 85,
    description:
      "Total US Bond Market will outperform Global Bonds (Unhedged) by 0.5",
    product1: "Total US Bond Market",
    product2: "Global Bonds (Unhedged)",
    movement: "up",
    percentage: 0.5,
  },
];

export const AddViewSlice = createSlice({
  name: "views",
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
export const { add, reset, updateConfidence } = AddViewSlice.actions;

export default AddViewSlice.reducer;
