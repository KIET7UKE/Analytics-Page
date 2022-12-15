import React, { useRef } from "react";
import { isObjectValidAndNotEmpty } from "../../constants/utils";
import ColumnsArrangement from "../ColumnsArrangement/ColumnsArrangement";
import "./Settings.css";

const Settings = (props) => {
  const { columns, onSchemaChange, onColumnsEdit } = props;

  const dragItem = useRef();
  const dragOverItem = useRef();
  const dragStart = (e, position) => {
    dragItem.current = position;
  };

  const dragEnter = (e, position) => {
    dragOverItem.current = position;
  };

  const drop = (e) => {
    const copyListItems = [...columns];
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    onSchemaChange(copyListItems);
  };

  const handleColumnsEdit = (index, active) => {
    onColumnsEdit(index, active);
  };

  return (
    <div className="glass settings-container">
      <ul className="column-order-btn-container">
        {columns.map((column, index) => {
          if (isObjectValidAndNotEmpty(column)) {
            return (
              <li
                key={column.id}
                onDragOver={(e) => e.preventDefault()}
                onDragStart={(e) => dragStart(e, index)}
                onDragEnter={(e) => dragEnter(e, index)}
                onDragEnd={drop}
                draggable
              >
                <ColumnsArrangement
                  column={column}
                  index={index}
                  canHide={column.hideable}
                  onColumnsEdit={handleColumnsEdit}
                />
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
};

export default Settings;
