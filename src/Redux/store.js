import { configureStore } from "@reduxjs/toolkit";
import analyticsReducer from "../components/Dashboard/AnalyticsSlice";

export default configureStore({
  reducer: {
    analyticsData: analyticsReducer,
  },
});
