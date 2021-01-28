import React from "react";
import "./ContactListItem.css";
import PropTypes from "prop-types";

const ContactListItem = ({ name, number, OnRemove }) => (
  <li className="ContactList_item">
    <p>
      {name}: 
    </p>
    <p>{number}</p>
    <button type="button" onClick={OnRemove} className="ContactList_item_btn">
      X
    </button>
  </li>
);

ContactListItem.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  OnRemove: PropTypes.func.isRequired,
};

export default ContactListItem;
