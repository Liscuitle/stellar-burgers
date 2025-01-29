import { createSlice } from "@reduxjs/toolkit";
import { TFullOrder } from "../../utils/data-types";

type TInitialState = {
  orders: TFullOrder[] | [];

  wsConnected: boolean;
  total: number | null;
  error?: Event;
  totalToday: number | null;
};

export const initialState: TInitialState = {
  totalToday: null,
  wsConnected: false,
  orders: [],
  total: null,
};

const wsSlice = createSlice({
  name: "wsOrders",
  initialState,
  reducers: {
    wsOpen: (state) => {
      state.wsConnected = true;
      state.error = undefined;
    },
    wsClose: () => initialState,

    wsRequest: (state, action) => {
      state.wsConnected = true;
      state.orders = action.payload.orders;
      state.error = undefined;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    },
    wsError: (state, action) => {
      state.wsConnected = false;
      state.error = action.payload;
    },
  },
});

export default wsSlice.reducer;
export const { wsOpen, wsClose, wsError, wsRequest } = wsSlice.actions;
