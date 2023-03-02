// @ts-nocheck
import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    risk: "balanced",
    isConfidence: false,
    isConstraint: false,
    return: 6.5,
    volatility: 21.8,
    sharpe: 0.21,
    equilibriumReturns: [6.67, 8.23, 6.76, 6.18, 5.43, 4.56, 1.39, 0.27],
    analystViews: [6.16, 7.45, 6.13, 5.68, 5.02, 4.23, 1.29, 0.26],
    weights: [
      {
        type: "US Large Cap Growth",
        value: 0.55543,
      },
      {
        type: "Emerging Markets",
        value: 0.25336,
      },
      {
        type: "Intl Developed ex-US Market",
        value: 0.1858,
      },
      {
        type: "US Small Cap Growth",
        value: 0.00541,
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
    risk: "balanced",
    isConfidence: false,
    isConstraint: true,
    return: 5.4,
    volatility: 18.2,
    sharpe: 0.19,
    equilibriumReturns: [6.67, 8.23, 1.39, 0.27, 6.76, 6.18, 5.43, 4.56],
    analystViews: [6.16, 7.45, 1.29, 0.26, 6.13, 5.68, 5.02, 4.23],
    weights: [
      {
        type: "US Large Cap Growth",
        value: 0.46082,
      },
      {
        type: "Emerging Markets",
        value: 0.24146,
      },
      {
        type: "Global Bonds (Unhedged)",
        value: 0.1,
      },
      {
        type: "Total US Bond Market",
        value: 0.1,
      },
      {
        type: "Intl Developed ex-US Market",
        value: 0.09772,
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
    ],
  },
  {
    risk: "balanced",
    isConfidence: true,
    isConstraint: true,
    return: 5.1,
    volatility: 18.1,
    sharpe: 0.17,
    equilibriumReturns: [6.67, 8.23, 1.39, 0.27, 6.76, 5.43, 6.18, 4.56],
    analystViews: [5.79, 6.89, 1.23, 0.26, 5.67, 4.72, 5.32, 3.99],
    weights: [
      {
        type: "US Large Cap Growth",
        value: 0.52462,
      },
      {
        type: "Emerging Markets",
        value: 0.27538,
      },
      {
        type: "Global Bonds (Unhedged)",
        value: 0.1,
      },
      {
        type: "Total US Bond Market",
        value: 0.1,
      },
      {
        type: "Intl Developed ex-US Market",
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
    ],
  },
  {
    risk: "balanced",
    isConfidence: true,
    isConstraint: false,
    return: 6.1,
    volatility: 21.5,
    sharpe: 0.19,
    equilibriumReturns: [6.67, 8.23, 6.76, 6.18, 5.43, 1.39, 0.27, 4.56],
    analystViews: [5.79, 6.89, 5.67, 5.32, 4.72, 1.23, 0.26, 3.99],
    weights: [
      {
        type: "US Large Cap Growth",
        value: 0.62127,
      },
      {
        type: "Emerging Markets",
        value: 0.28339,
      },
      {
        type: "Intl Developed ex-US Market",
        value: 0.08929,
      },
      {
        type: "US Small Cap Growth",
        value: 0.00605,
      },
      {
        type: "US Mid Cap Growth",
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
      {
        type: "US Small Cap Value",
        value: 0.0,
      },
    ],
  },
  {
    risk: "aggressive",
    isConfidence: false,
    isConstraint: false,
    return: 9.5,
    volatility: 31.1,
    sharpe: 0.24,
    equilibriumReturns: [8.23, 6.67, 5.43, 6.18, 4.56, 6.76, 1.39, 0.27],
    analystViews: [9.58, 6.33, 4.97, 5.94, 4.06, 7.06, 1.47, 0.21],
    weights: [
      {
        type: "Emerging Markets",
        value: 0.97389,
      },
      {
        type: "US Large Cap Growth",
        value: 0.02611,
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
        type: "Intl Developed ex-US Market",
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
    isConfidence: false,
    isConstraint: true,
    return: 9.2,
    volatility: 29.9,
    sharpe: 0.24,
    equilibriumReturns: [8.23, 6.18, 6.67, 5.43, 4.56, 6.76, 1.39, 0.27],
    analystViews: [9.58, 5.94, 6.33, 4.97, 4.06, 7.06, 1.47, 0.21],
    weights: [
      {
        type: "Emerging Markets",
        value: 0.89371,
      },
      {
        type: "US Small Cap Growth",
        value: 0.1,
      },
      {
        type: "US Large Cap Growth",
        value: 0.00629,
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
        type: "Intl Developed ex-US Market",
        value: 0.0,
      },
      {
        type: "Global Bonds (Unhedged)",
        value: 0.0,
      },
      {
        type: " Total US Bond Market",
        value: 0.0,
      },
    ],
  },
  {
    risk: "conservative",
    isConfidence: false,
    isConstraint: false,
    return: 0.2,
    volatility: 2.6,
    sharpe: -0.71,
    equilibriumReturns: [0.27, 6.76, 6.67, 1.39, 5.43, 6.18, 4.56, 8.23],
    analystViews: [0.16, 5.34, 5.46, 0.45, 4.58, 4.91, 3.85, 5.96],
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
        type: "US Large Cap Growth",
        value: 0.0,
      },
      {
        type: "Global Bonds (Unhedged)",
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
  {
    risk: "conservative",
    isConfidence: false,
    isConstraint: true,
    return: 0.7,
    volatility: 4.0,
    sharpe: -0.32,
    equilibriumReturns: [0.27, 6.67, 1.39, 6.76, 5.43, 6.18, 4.56, 8.23],
    analystViews: [0.16, 5.46, 0.45, 5.34, 4.58, 4.91, 3.85, 5.96],
    weights: [
      {
        type: "Total US Bond Market",
        value: 0.8,
      },
      {
        type: "US Large Cap Growth",
        value: 0.1,
      },
      {
        type: "Global Bonds (Unhedged)",
        value: 0.1,
      },
      {
        type: "Intl Developed ex-US Market",
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

export const ResultSlice = createSlice({
  name: "results",
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
export const { add, reset } = ResultSlice.actions;

export default ResultSlice.reducer;
