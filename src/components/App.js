import React, { Component } from "react";
import uuid from "react-uuid";
import ContactForm from "./ContactForm/ContactForm";
import ContactList from "./ContactList/ContactList";
import Filter from "./Filter/Filter";
import Alert from "./Alert/Alert";
import { CSSTransition } from "react-transition-group";
import "./App.css";

const INITIAL_STATE = {
  isVisible: false,
  message: "",
};

export default class App extends Component {
  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermion Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
    filter: "",
    ...INITIAL_STATE,
  };

  componentDidMount() {
    const persistedContacts = localStorage.getItem("contacts");

    if (persistedContacts) {
      this.setState({ contacts: JSON.parse(persistedContacts) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }

  findContact = (contacts, contact) =>
    contacts.find(
      (item) => item.name.toLowerCase() === contact.name.toLowerCase()
    );

  addContact = (name, number) => {
    const contact = {
      id: uuid(),
      name,
      number,
    };

    const contactFind = this.findContact(this.state.contacts, contact);

    this.setState(() => {
      if (contact.name) {
        if (contactFind) {
          this.setState({
            isVisible: true,
            message: "Contact already exists!",
          });
          setTimeout(() => {
            this.setState({
              ...INITIAL_STATE
            });
          }, 3000);
        } else {
          this.setState((prevState) => ({
            contacts: [...prevState.contacts, contact],
          }));
        }
      } else {
        alert("Input name please!");
      }

      // contacts: [...prevState.contacts, contact],
    });
  };

  changeFilter = (filter) => {
    this.setState({ filter });
  };

  getVisibleContact = () => {
    const { contacts, filter } = this.state;

    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  removeContact = (contactId) => {
    this.setState((prevState) => {
      return {
        contacts: prevState.contacts.filter(({ id }) => id !== contactId),
      };
    });
  };

  render() {
    const { contacts, filter, isVisible, message } = this.state;
    const visibleContact = this.getVisibleContact();

    return (
      <div className="Container">
        <CSSTransition
          in={true}
          appear={true}
          timeout={500}
          unmountOnExit
          classNames="PhoneBook-logo"
        >
          <h1 className="Logo">PhoneBook</h1>
        </CSSTransition>

        <CSSTransition
          in={isVisible}
          timeout={250}
          unmountOnExit
          classNames="AlertTransition"
        >
          <Alert message={message} />
        </CSSTransition>

        <ContactForm onAddContact={this.addContact} />

        <h2>Contacts</h2>
        {contacts.length > 1 && (
          <Filter value={filter} onChangeFilter={this.changeFilter} />
        )}
        {visibleContact.length > 0 && (
          <ContactList
            contacts={visibleContact}
            onRemoveContact={this.removeContact}
          />
        )}
      </div>
    );
  }
}
