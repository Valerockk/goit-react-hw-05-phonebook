import React from "react";
import ContactListItem from "../ContactListItem/ContactListItem";
import "./ContactList.css";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import PropTypes from "prop-types";

const ContactList = ({ contacts, onRemoveContact }) => (
  <TransitionGroup component="ul" className="ContactList">
    {contacts.map(({ id, name, number }) => (
      <CSSTransition
        in={true}
        appear={true}
        key={id}
        timeout={250}
        classNames="Item-animation"
        unmountOnExit
      >
        <ContactListItem
          name={name}
          number={number}
          OnRemove={() => onRemoveContact(id)}
        />
      </CSSTransition>
    ))}
  </TransitionGroup>
);

ContactList.prototype = {
  contacts: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  onRemoveContact: PropTypes.func.isRequired,
};

export default ContactList;
