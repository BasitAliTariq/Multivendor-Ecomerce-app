import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSellerAuthenticated: false,
  isloading: true,
  seller: null,
  error: null,
};

const sellerSlice = createSlice({
  name: "seller", // name of the slice
  initialState,
  reducers: {
    LoadSellerRequest: (state) => {
      state.isloading = true;
    },
    LoadSellerSuccess: (state, action) => {
      state.isSellerAuthenticated = true;
      state.isloading = false;
      state.seller = action.payload;
    },
    LoadSellerFail: (state, action) => {
      state.isSellerAuthenticated = false;
      state.isloading = false;
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

// Export actions to dispatch
export const {
  LoadSellerRequest,
  LoadSellerSuccess,
  LoadSellerFail,
  clearError,
} = sellerSlice.actions;

// Export reducer to add to store
export const sellerReducer = sellerSlice.reducer;
