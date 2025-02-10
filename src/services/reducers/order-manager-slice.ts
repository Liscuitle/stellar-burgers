import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createOrder } from "../../utils/api";
import { TOrderNumber } from "../../utils/data-types";

export const initialState: TOrderNumber = {
  number: 0,
};

export const fetchOrder = createAsyncThunk("order/post", createOrder);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrder.pending, (state) => initialState)
      .addCase(fetchOrder.fulfilled, (state, action) => action.payload.order);
  },
});

export default orderSlice.reducer;
