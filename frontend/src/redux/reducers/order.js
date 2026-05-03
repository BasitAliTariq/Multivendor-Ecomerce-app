import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  orders: null,
  error: null,
  shopOrders: null,
};

const orderSlice = createSlice({
  initialState,
  name: "order",
  reducers: {
    //get All Orders of a user
    getAllOrdersUserRequest: (state) => {
      state.isLoading = true;
    },

    getAllOrdersUserSuccess: (state, actions) => {
      state.isLoading = false;
      state.orders = actions.payload;
    },

    getAllOrdersUserFailed: (state, actions) => {
      state.isLoading = false;
      state.error = actions.payload;
    },

    //get All Orders of a shop
    getAllOrdersShopRequest: (state) => {
      state.isLoading = true;
    },

    getAllOrdersShopSuccess: (state, actions) => {
      state.isLoading = false;
      state.shopOrders = actions.payload;
    },

    getAllOrdersShopFailed: (state, actions) => {
      state.isLoading = false;
      state.error = actions.payload;
    },

    clearError: (state) => {
      state.error = null;
    },
  },
});

export const orderReducer = orderSlice.reducer;
export const {
  getAllOrdersUserRequest,
  getAllOrdersUserSuccess,
  getAllOrdersUserFailed,
  getAllOrdersShopRequest,
  getAllOrdersShopSuccess,
  getAllOrdersShopFailed,
  clearError,
} = orderSlice.actions;
