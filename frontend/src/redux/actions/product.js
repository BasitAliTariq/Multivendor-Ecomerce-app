import axios from "axios";
import { server } from "../../server";

import {
  deleteProductFailed,
  deleteProductRequest,
  deleteProductSuccess,
  getAllProductsFail,
  getAllProductsRequest,
  geTAllProductsShopFailed,
  getAllProductsShopRequest,
  geTAllProductsShopSuccess,
  getAllProductsSucces,
  productCreateFail,
  productCreateRequest,
  productCreateSuccess,
} from "../reducers/product";
// create product
export const createProduct = (newForm) => async (dispatch) => {
  try {
    dispatch(productCreateRequest());

    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const { data } = await axios.post(
      `${server}/product/create-product`,
      newForm,
      config,
    );
    dispatch(productCreateSuccess(data.product));
    return data.success;
  } catch (error) {
    dispatch(productCreateFail(error.response.data.message));
  }
};

// get all products of shop

export const getAllPrroductShop = (id) => async (dispatch) => {
  try {
    dispatch(getAllProductsShopRequest());
    const { data } = await axios.get(
      `${server}/product/get-all-products-shop/${id}`,
    );
    dispatch(geTAllProductsShopSuccess(data.products));
    return data.success;
  } catch (error) {
    dispatch(geTAllProductsShopFailed(error.response.data.message));
  }
};

// delete product of a shop

export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch(deleteProductRequest());
    const { data } = await axios.delete(
      `${server}/product/delete-shop-product/${id}`,
      { withCredentials: true },
    );
    dispatch(deleteProductSuccess({ message: data.message }));
  } catch (error) {
    dispatch(deleteProductFailed(error.response.data.message));
  }
};

// get all products of all shops

export const getAllProducts = () => async (dispatch) => {
  try {
    dispatch(getAllProductsRequest());
    const { data } = await axios.get(`${server}/product/get-all-products`);
    dispatch(getAllProductsSucces(data.products));
  } catch (error) {
    dispatch(getAllProductsFail(error.response.data.message));
  }
};
