import { createSlice } from "@reduxjs/toolkit";

export const AnalyticsSlice = createSlice({
  name: "AnalyticsData",
  initialState: {
    tableData: [],
    appData: [],
    inactiveCols: [],
  },
  reducers: {
    setTableData2: (state) => {
      state.value += 1;
    },
    setAppData: (state, action) => {
      state.appData = action.payload;
    },
    setTableData: (state, action) => {
      state.tableData = action.payload;
    },
    setInactiveCols: (state, action) => {
      state.inactiveCols = action.payload;
    },
  },
});

export const { setTableData, setAppData } = AnalyticsSlice.actions;

export default AnalyticsSlice.reducer;
