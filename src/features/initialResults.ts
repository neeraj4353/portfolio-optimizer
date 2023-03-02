// @ts-nocheck
import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    risk: "balanced",
    return: 7.0,
    volatility: 21.6,
    sharpe: 0.23,
    equilibriumReturns: [
      6.043556116, 6.307626077, 7.618383844, 5.154818964, 5.679844655,
      4.390167948, 1.287129447, 0.243855185,
    ].map((v) => v.toFixed(2)),
    weights: [
      {
        type: "US Large Cap Growth",
        value: 0.48501,
      },
      {
        type: "Intl Developed ex-US Market",
        value: 0.28903,
      },

      {
        type: "Emerging Markets",
        value: 0.22124,
      },
      {
        type: "US Small Cap Growth",
        value: 0.00472,
      },
      {
        type: "US Mid Cap Growth",
        value: 0.0,
      },
      {
        type: "US Small Cap Value",
        value: 0.0,
      },
      {
        type: "Global Bonds (Unhedged)",
        value: 0.0,
      },
      {
        type: "Total US Bond Market",
        value: 0.0,
      },
    ],
  },
  {
    risk: "aggressive",
    return: 8.2,
    volatility: 31.2,
    sharpe: 0.2,
    equilibriumReturns: [
      6.043556116, 7.618383844, 5.679844655, 5.154818964, 4.390167948,
      6.307626077, 1.287129447, 0.243855185,
    ].map((v) => v.toFixed(2)),
    weights: [
      {
        type: "Emerging Markets",
        value: 0.97916,
      },
      {
        type: "US Large Cap Growth",
        value: 0.01084,
      },
      {
        type: "Intl Developed ex-US Market",
        value: 0.01,
      },
      {
        type: "US Small Cap Growth",
        value: 0.0,
      },
      {
        type: "US Mid Cap Growth",
        value: 0.0,
      },
      {
        type: "US Small Cap Value",
        value: 0.0,
      },
      {
        type: "Global Bonds (Unhedged)",
        value: 0.0,
      },
      {
        type: "Total US Bond Market",
        value: 0.0,
      },
    ],
  },
  {
    risk: "conservative",
    return: 0.3,
    volatility: 2.6,
    sharpe: -0.67,
    equilibriumReturns: [
      0.243855185, 6.307626077, 1.287129447, 6.043556116, 5.154818964,
      5.679844655, 4.390167948, 7.618383844,
    ].map((v) => v.toFixed(2)),
    weights: [
      {
        type: "Total US Bond Market",
        value: 0.99649,
      },
      {
        type: "Intl Developed ex-US Market",
        value: 0.00351,
      },
      {
        type: "Global Bonds (Unhedged)",
        value: 0.0,
      },
      {
        type: "US Large Cap Growth",
        value: 0.0,
      },
      {
        type: "US Mid Cap Growth",
        value: 0.0,
      },
      {
        type: "US Small Cap Growth",
        value: 0.0,
      },
      {
        type: "US Small Cap Value",
        value: 0.0,
      },
      {
        type: "Emerging Markets",
        value: 0.0,
      },
    ],
  },
];

export const InitialResultSlice = createSlice({
  name: "initialResults",
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
export const { add, reset } = InitialResultSlice.actions;

export default InitialResultSlice.reducer;
