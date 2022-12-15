import React from "react";
import "./EmptyData.css";

const EmptyData = () => {
  return (
    <div className="glass no-data-component-container">
      <img
        className="no-data-found-image"
        src="/noDataFoundImage.png"
        alt="no data found"
      />
      <div className="no-data-message">
        <div className="no-data-message-title">
          <h2>Hey! Something's off!</h2>
          <h3>We couldn't display the given data.</h3>
        </div>
        <small className="no-data-message-desc">
          Try changing your filters or selecting a different date.
        </small>
      </div>
    </div>
  );
};

export default EmptyData;
