import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  product: null,
  success: false,
  error: null,
  products: null,
  allProducts: null,
};

const productSlice = createSlice({
  initialState,
  name: "product",

  reducers: {
    //create a product
    productCreateRequest: (state) => {
      state.isLoading = true;
    },

    productCreateSuccess: (state, action) => {
      state.isLoading = false;
      state.product = action.payload;
      state.success = true;
    },
    productCreateFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    },
    resetProductState: (state) => {
      state.success = false;
      state.product = null;
    },

    // get all product of shop

    getAllProductsShopRequest: (state) => {
      state.isLoading = true;
    },
    geTAllProductsShopSuccess: (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
    },
    geTAllProductsShopFailed: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // delete product of shop

    deleteProductRequest: (state) => {
      state.isLoading = true;
    },

    deleteProductSuccess: (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
    },

    deleteProductFailed: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // get all products of all shops

    getAllProductsRequest: (state) => {
      state.isLoading = true;
    },
    getAllProductsSucces: (state, action) => {
      state.isLoading = false;
      state.allProducts = action.payload;
    },
    getAllProductsFail: () => {
      state.isLoading = false;
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const productReducer = productSlice.reducer;

export const {
  productCreateRequest,
  productCreateSuccess,
  productCreateFail,
  resetProductState,
  getAllProductsShopRequest,
  geTAllProductsShopSuccess,
  geTAllProductsShopFailed,
  deleteProductRequest,
  deleteProductSuccess,
  deleteProductFailed,
  getAllProductsRequest,
  getAllProductsSucces,
  getAllProductsFail,
  clearError,
} = productSlice.actions;
