import React, { useEffect, useState, useCallback } from "react";
import "./AnalyticsBoard.css";
import Settings from "../Settings/Settings";
import Table from "../Table/Table";
import axios from "axios";
import TuneIcon from "@mui/icons-material/Tune";
import { Collapse, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setAppData, setTableData } from "./AnalyticsSlice";
import EmptyData from "../EmptyData/EmptyData";
import DateRange from "../DatesRange/DateRange";

const AnalyticsBoard = () => {

  const analyticsData = useSelector((state) => state.analyticsData);
  const tableData = analyticsData.tableData;
  const appData = analyticsData.appData;
  const dispatch = useDispatch();

  const [schema, setSchema] = useState([]);
  const [hiddenColumns, setHiddenColumns] = useState([]);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [dateRange, setDateRange] = useState({
    start: "2021-06-01",
    end: "2021-06-30",
  });

  const fetchAnalyticsSchema = useCallback(async () => {
    try {
      const fetchedSchema = await axios.get("/analyticsSchema.json");
      setSchema(fetchedSchema.data.tableCells);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const fetchData = async () => {
    console.log("fetch dates", dateRange.start, dateRange.end);
    try {
      const fetchedData = await axios.get(
        `http://go-dev.greedygame.com/v3/dummy/report?startDate=${dateRange.start}&endDate=${dateRange.end}`
      );
      const rows = fetchedData.data.data;
      console.log("date rows", rows);
      rows.map((row) => {
        row.fill_rate = row.requests / row.responses;
        row.ctr = row.clicks / row.impressions;
      });
      dispatch(setTableData(rows));
    } catch (err) {
      console.log(err);
    }
  };

  const handleSchemaChange = (newSchema) => {
    setSchema(newSchema);
  };

  const handleColumnsEdit = (index, active) => {
    let newHiddenColumns = [...hiddenColumns];
    if (active) {
      newHiddenColumns.push(index);
    } else {
      newHiddenColumns.pop(index);
    }
    setHiddenColumns(newHiddenColumns);
  };

  const fetchAppData = useCallback(async () => {
    try {
      const fetchedAppData = await axios.get(
        "http://go-dev.greedygame.com/v3/dummy/apps"
      );
      const appData = fetchedAppData.data.data;
      dispatch(setAppData(appData));
    } catch (err) {
      console.log(err);
    }
  });

  const handleDateChange = (startDate, endDate) => {
    console.log("received dates", startDate, endDate);
    setDateRange({
      start: startDate,
      end: endDate,
    });
  };

  console.log("my dates", dateRange);

  const toggleSettings = () => {
    setSettingsOpen((prevState) => !prevState);
  };

  useEffect(() => {
    fetchData();
  }, [dateRange]);

  useEffect(() => {
    fetchAnalyticsSchema();
    fetchAppData();
    fetchData();
  }, []);
  return (
    <div className="analytics-container glass">
      <header>
        <h2>Analytics</h2>
      </header>
      <div className="date-and-settings">
        <DateRange onDatesChange={handleDateChange} dates={dateRange} />
        <button className="settings-btn" onClick={toggleSettings}>
          <TuneIcon></TuneIcon>
          Settings
        </button>
      </div>
      <div>
      Dimensions and Metrics
      </div>
      <Collapse in={settingsOpen}>
        <Settings
          columns={schema}
          onSchemaChange={handleSchemaChange}
          onColumnsEdit={handleColumnsEdit}
        />
      </Collapse>
      {tableData.length ? (
        <Table
          schema={schema}
          data={tableData}
          appData={appData}
          hideColumns={hiddenColumns}
        />
      ) : (
        <EmptyData />
      )}
    </div>
  );
};

export default AnalyticsBoard;
