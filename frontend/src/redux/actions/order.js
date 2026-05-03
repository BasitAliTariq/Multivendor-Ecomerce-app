import axios from "axios";
import {
  getAllOrdersShopFailed,
  getAllOrdersShopRequest,
  getAllOrdersShopSuccess,
  getAllOrdersUserFailed,
  getAllOrdersUserRequest,
  getAllOrdersUserSuccess,
} from "../reducers/order";
import { server } from "../../server";

//get all orders of a user
export const getAllOrdersUserFun = (userId) => async (dispatch) => {
  try {
    dispatch(getAllOrdersUserRequest());

    const { data } = await axios.get(
      `${server}/order/get-all-orders/${userId}`,
    );

    dispatch(getAllOrdersUserSuccess(data.orders));
  } catch (error) {
    dispatch(getAllOrdersUserFailed(error.response.data.message));
  }
};

//get all orders of a shop
export const getAllOrdersShopFun = (shopId) => async (dispatch) => {
  try {
    dispatch(getAllOrdersShopRequest());

    const { data } = await axios.get(
      `${server}/order/get-seller-all-orders/${shopId}`,
    );

    dispatch(getAllOrdersShopSuccess(data.orders));
  } catch (error) {
    dispatch(getAllOrdersShopFailed(error.response.data.message));
  }
};
