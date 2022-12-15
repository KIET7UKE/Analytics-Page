import React, { useState } from "react";
import {
  getStringFromObject,
  isArrayValidAndNotEmpty,
  isObjectValidAndNotEmpty,
  makeCurrency,
  makeNumber,
  makePercentage,
} from "../../constants/utils";
import "./Table.css";

const Table = (props) => {
  const { schema, data, appData, hideColumns, totalRows } = props;
  const totalPages = Math.ceil(data.length / 10);
  const [page, setPage] = useState(1);

  const getAppName = (appId) => {
    const requiredApp = appData.filter(
      (appDetails) => appDetails.app_id === appId
    );
    return requiredApp.app_name;
  };

  const decrementPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const incrementPage = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  const paginatedData = () => {
    console.log("data to paginate", data);
    let paginatedData = [];
    for (let i = (page - 1) * 10; i < (page - 1) * 10 + 10; i++) {
      paginatedData.push(data[i]);
    }
    console.log("paginated", paginatedData);
    return paginatedData;
  };

  const textToDisplay = (column, data) => {
    let text = "";
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    text = getStringFromObject(column.find, data);
    if (isObjectValidAndNotEmpty(data)) {
      switch (column.type) {
        case "date":
          text = new Date(text);
          text = text.toLocaleDateString("en-GB", options);
          break;

        case "number":
          text = makeNumber(text);
          break;

        case "app":
          const requiredApp = appData.filter(
            (app) => app.app_id === data.app_id
          );
          if (isArrayValidAndNotEmpty(requiredApp)) {
            text = getStringFromObject("app_name", requiredApp[0]);
          }
          break;

        case "currency":
          text = makeCurrency(text);
          break;

        case "percentage":
          text = makePercentage(text);
          break;

        default:
          text = text;
      }
    }
    return text;
  };

  return (
    <div className="table-container">
      <table className="table" cellSpacing="0">
        <thead>
          <tr>
            {isArrayValidAndNotEmpty(data) &&
              schema.map((column, index) => {
                if (isObjectValidAndNotEmpty(column)) {
                  if (
                    !hideColumns.some((hiddenIndex) => hiddenIndex === index)
                  ) {
                    return (
                      <th key={column.id} className={column.align}>
                        {column.label}
                      </th>
                    );
                  }
                }
              })}
          </tr>
        </thead>
        <tbody>
          {isArrayValidAndNotEmpty(data) &&
            paginatedData(data).map((row, rowIndex) => (
              <tr key={2 * rowIndex}>
                {schema.map((column, index) => {
                  if (isObjectValidAndNotEmpty(column)) {
                    if (
                      !hideColumns.some((hiddenIndex) => hiddenIndex === index)
                    ) {
                      return (
                        <td key={column.id} className={column.align}>
                          {textToDisplay(column, row)}
                        </td>
                      );
                    }
                  }
                })}
              </tr>
            ))}
        </tbody>
      </table>
      <div className="pagination-footer">
        <hr className="footer-line"></hr>
        <div className="pagination-row">
          <div className="pagination-button-group">
            <button
              onClick={decrementPage}
              className="pagination-button"
              disabled={page === 1}
            >
              <bold>&#60;</bold>
            </button>
            <strong>{page}</strong>
            <button
              onClick={incrementPage}
              className="pagination-button"
              disabled={page === totalPages}
            >
              <bold>&#62;</bold>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
