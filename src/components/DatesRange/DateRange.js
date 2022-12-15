import React, { useState, useEffect } from "react";
import "./DateRange.css";
import { TextField } from "@mui/material";

const DateRange = (props) => {
  const { dates, onDatesChange } = props;
  const [startDate, setStartDate] = useState(dates.start);
  const [endDate, setEndDate] = useState(dates.end);

  const handleDatesChange = async (e) => {
    if (e.target.name === "start-date") {
      setStartDate(e.target.value);
    } else {
      setEndDate(e.target.value);
    }
  };

  useEffect(() => {
    onDatesChange(startDate, endDate);
  }, [startDate, endDate]);

  return (
    <div className="date-range-filter-container">
      <TextField
        id="from-date"
        type="date"
        name="start-date"
        value={startDate}
        defaultValue="2021-05-21"
        size="small"
        onChange={handleDatesChange}
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          style: {
            height: "30px",
            width: "120px",
            fontSize: "0.8em",
          },
        }}
      />
      <span>-</span>
      <TextField
        id="to-date"
        name="end-date"
        type="date"
        value={endDate}
        size="small"
        onChange={handleDatesChange}
        defaultValue="2021-05-30"
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          style: {
            height: "30px",
            width: "120px",
            fontSize: "0.8em",
          },
        }}
      />
    </div>
  );
};

export default DateRange;
