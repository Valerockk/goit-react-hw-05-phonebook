import React from "react";
import PropTypes from "prop-types";
import "./Filter.css";

export default function Filter({ value, onChangeFilter }) {
  return (
    <div className="Filter_form">
      <p className="Filter_title">Find contacts by name</p>
      <input
        type="text"
        value={value}
        onChange={(e) => onChangeFilter(e.target.value)}
        className="Filter_input"
      />
    </div>
  );
}

Filter.prototype = {
  value: PropTypes.string.isRequired,
  onChangeFilter: PropTypes.func.isRequired,
};
