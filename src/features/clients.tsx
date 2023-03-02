// @ts-nocheck
import { createSlice, current } from "@reduxjs/toolkit";

const initialState = [
  {
    id: 1,
    name: "Sam Smith",
    image: "images/pic1.jpg",
    email: "sam@example.com",
    phone: "+966 76758 56767",
    totalInvestedAmount: 500000,
    isConfidence: true,
    latestInvestment: {
      amount: 300000,
      timeHorizon: 5,
      riskProfile: "balanced",
    },
  },
  {
    id: 2,
    name: "Julia Rose",
    image: "images/pic2.jpg",
    email: "julia@example.com",
    phone: "+966 98790 56767",
    totalInvestedAmount: 450000,
    latestInvestment: {
      amount: 400000,
      timeHorizon: 3,
      riskProfile: "aggressive",
    },
  },
  {
    id: 3,
    name: "Harry Jones",
    image: "images/pic3.jpg",
    email: "harry@example.com",
    phone: "+966 76758 56767",
    totalInvestedAmount: 700000,
    latestInvestment: {
      amount: 500000,
      timeHorizon: 7,
      riskProfile: "conservative",
    },
  },
];

export const ClientsSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {
    update: (state, { payload }) => {
      const clientWithID = state.filter(
        (client) => client.id === parseInt(payload.id)
      );
      const clientWithoutID = state.filter(
        (cc) => cc.id !== parseInt(payload.id)
      );

      return [
        ...clientWithoutID,
        {
          ...clientWithID[0],
          latestInvestment: {
            ...clientWithID[0]?.latestInvestment,
            riskProfile: payload.risk,
          },
        },
      ];
    },
    addConstraint: (state, { payload }) => {
      const clientWithID = state.filter(
        (client) => client.id === parseInt(payload)
      );
      const clientWithoutID = state.filter((cc) => cc.id !== parseInt(payload));

      return [
        ...clientWithoutID,
        {
          ...clientWithID[0],
          isContraint: true,
        },
      ];
    },
    removeConstraint: (state, { payload }) => {
      const clientWithID = state.filter(
        (client) => client.id === parseInt(payload)
      );
      const clientWithoutID = state.filter((cc) => cc.id !== parseInt(payload));

      return [
        ...clientWithoutID,
        {
          ...clientWithID[0],
          isContraint: false,
        },
      ];
    },
    toggleConfidence: (state, { payload }) => {
      const clientWithID = state.filter(
        (client) => client.id === parseInt(payload)
      );
      const clientWithoutID = state.filter((cc) => cc.id !== parseInt(payload));

      return [
        ...clientWithoutID,
        {
          ...clientWithID[0],
          isConfidence: !clientWithID[0].isConfidence,
        },
      ];
    },
    reset: (state) => {
      state = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  update,
  reset,
  addConstraint,
  removeConstraint,
  toggleConfidence,
} = ClientsSlice.actions;

export default ClientsSlice.reducer;
