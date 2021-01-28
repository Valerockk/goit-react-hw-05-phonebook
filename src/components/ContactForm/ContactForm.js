import React, { Component } from "react";
import "./ContactForm.css";
import PropTypes from "prop-types";

export default class ContactForm extends Component {
  state = {
    name: "",
    number: "",
  };

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.onAddContact(this.state.name, this.state.number);
    this.setState({ name: "", number: "" });
  };

  handlechange = (e) => {
    const { name } = e.target;

    this.setState({ [name]: e.target.value });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="ContactForm">
        <label className="ContactForm_label">
          Name
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handlechange}
            className="ContactForm_input"
          />
        </label>

        <label className="ContactForm_label">
          Number
          <input
            type="tel"
            name="number"
            value={this.state.number}
            onChange={this.handlechange}
            placeholder="Example +380440000000"
            className="ContactForm_input"
          />
        </label>

        <button type="submit" className="ContactForm_btn">
          Add contact
        </button>
      </form>
    );
  }
}

ContactForm.propTypes = {
  onAddContact: PropTypes.func.isRequired,
};
