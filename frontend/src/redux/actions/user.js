import axios from "axios";
import { server } from "../../server";
import {
  LoadUserRequest,
  LoadUserSuccess,
  LoadUserFail,
  updateUserInfoRequest,
  updateUserInfoSuccess,
  updateUserInfoFailed,
  updateUserAddressFailed,
  updateUserAddressRequest,
  updateUserAddressSuccess,
  deleteUserAddressFail,
  deleteUserAddressRequest,
  deleteUserAddressSuccess,
} from "../reducers/user";
import {
  LoadSellerFail,
  LoadSellerRequest,
  LoadSellerSuccess,
} from "../reducers/seller";
//load user
export const loadUser = () => async (dispatch) => {
  try {
    dispatch(LoadUserRequest());
    const { data } = await axios.get(`${server}/user/getuser`, {
      withCredentials: true,
    });
    dispatch(LoadUserSuccess(data.user));
  } catch (e) {
    dispatch(LoadUserFail(e.message));
  }
};

//load seller
export const loadSeller = () => async (dispatch) => {
  try {
    dispatch(LoadSellerRequest());
    const { data } = await axios.get(`${server}/shop/getseller`, {
      withCredentials: true,
    });
    dispatch(LoadSellerSuccess(data.seller));
  } catch (e) {
    dispatch(LoadSellerFail(e.message));
  }
};

// user update information

export const updateUserInformation =
  (name, email, password, phoneNumber) => async (dispatch) => {
    try {
      dispatch(updateUserInfoRequest());

      const data = await axios.put(
        `${server}/user/update-user-info`,
        {
          name,
          email,
          password,
          phoneNumber,
        },
        { withCredentials: true },
      );
      dispatch(updateUserInfoSuccess(data.user));
      return data;
    } catch (error) {
      dispatch(updateUserInfoFailed(error.response.data.message));
    }
  };

// update user address

export const updateUserAddress =
  ({ country, city, address1, address2, zipCode, addressType }) =>
  async (dispatch) => {
    try {
      dispatch(updateUserAddressRequest());
      const { data } = await axios.put(
        `${server}/user/update-user-addresses`,
        {
          country,
          city,
          address1,
          address2,
          zipCode,
          addressType,
        },
        { withCredentials: true },
      );
      dispatch(
        updateUserAddressSuccess({
          successMessage: "Address updated successfully",
          user: data.user,
        }),
      );
      return data;
    } catch (error) {
      dispatch(updateUserAddressFailed(error.response.data.message));
    }
  };

//delet user address

export const deleeteUserAddress = (id) => async (dispatch) => {
  try {
    dispatch(deleteUserAddressRequest());
    const { data } = await axios.delete(
      `${server}/user/delete-user-address/${id}`,
      {
        withCredentials: true,
      },
    );
    dispatch(
      deleteUserAddressSuccess({
        successMessage: "Address deleted successfully",
        user: data.user,
      }),
    );
  } catch (error) {
    dispatch(deleteUserAddressFail(error.response.data.message));
  }
};
