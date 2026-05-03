import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  event: null,
  events: [],
  success: false,
  message: null,
  error: null,
  allEvents: null,
};

const eventSlice = createSlice({
  initialState,
  name: "event",

  reducers: {
    //create a event
    eventCreateRequest: (state) => {
      state.isLoading = true;
    },

    eventCreateSuccess: (state, action) => {
      state.isLoading = false;
      state.event = action.payload;
      state.success = true;
    },
    eventCreateFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    },
    reseteventState: (state) => {
      state.success = false;
      state.event = null;
    },

    // get all event of shop

    getAlleventsShopRequest: (state) => {
      state.isLoading = true;
    },
    geTAlleventsShopSuccess: (state, action) => {
      state.isLoading = false;
      state.events = action.payload;
    },
    geTAlleventsShopFailed: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // delete event of shop

    deleteeventRequest: (state) => {
      state.isLoading = true;
    },

    deleteeventSuccess: (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
    },

    deleteeventFailed: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // get all events of shops
    getAlleventsRequest: (state) => {
      state.isLoading = true;
    },
    geTAlleventsSuccess: (state, action) => {
      state.isLoading = false;
      state.allEvents = action.payload;
    },
    geTAlleventsFailed: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    clearError: (state) => {
      state.error = null;
    },
  },
});

export const eventReducer = eventSlice.reducer;

export const {
  eventCreateRequest,
  eventCreateSuccess,
  eventCreateFail,
  reseteventState,
  getAlleventsShopRequest,
  geTAlleventsShopSuccess,
  geTAlleventsShopFailed,
  deleteeventRequest,
  deleteeventSuccess,
  deleteeventFailed,
  getAlleventsRequest,
  geTAlleventsSuccess,
  geTAlleventsFailed,
  clearError,
} = eventSlice.actions;
