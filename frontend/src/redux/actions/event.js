import axios from "axios";
import { server } from "../../server";

import {
  deleteeventFailed,
  deleteeventRequest,
  deleteeventSuccess,
  geTAlleventsShopFailed,
  getAlleventsShopRequest,
  geTAlleventsShopSuccess,
  eventCreateFail,
  eventCreateRequest,
  eventCreateSuccess,
  getAlleventsRequest,
  geTAlleventsFailed,
  geTAlleventsSuccess,
} from "../reducers/event";
// create event
export const createevent = (newForm) => async (dispatch) => {
  try {
    dispatch(eventCreateRequest());

    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const { data } = await axios.post(
      `${server}/event/create-event`,
      newForm,
      config,
    );
    dispatch(eventCreateSuccess(data.event));
    return data.success;
  } catch (error) {
    dispatch(eventCreateFail(error.response.data.message));
  }
};

// get all events of shop

export const getAllEventsShop = (id) => async (dispatch) => {
  try {
    dispatch(getAlleventsShopRequest());
    const { data } = await axios.get(
      `${server}/event/get-all-events-shop/${id}`,
    );
    dispatch(geTAlleventsShopSuccess(data.events));
    return data.success;
  } catch (error) {
    dispatch(geTAlleventsShopFailed(error.response.data.message));
  }
};

// delete event of a shop

export const deleteevent = (id) => async (dispatch) => {
  try {
    dispatch(deleteeventRequest());
    const { data } = await axios.delete(
      `${server}/event/delete-shop-event/${id}`,
      { withCredentials: true },
    );
    dispatch(deleteeventSuccess({ message: data.message }));
  } catch (error) {
    dispatch(deleteeventFailed(error.response.data.message));
  }
};

// get all events of all shops

export const getAllEvents = () => async (dispatch) => {
  try {
    dispatch(getAlleventsRequest());
    const { data } = await axios.get(`${server}/event/get-all-events`);
    dispatch(geTAlleventsSuccess(data.events));
  } catch (error) {
    dispatch(geTAlleventsFailed(error.response.data.message));
  }
};
