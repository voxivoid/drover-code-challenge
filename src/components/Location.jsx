import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Dropdown from "./Dropdown";

const Input = styled.input`
  width: 100%;
  height: 100%;
  text-align: left;
  color:  #000;
  border: 0;
`;

const autoCompleteService = new window.google.maps.places.AutocompleteService();
const getPlacePredictions = options => new Promise(resolve => autoCompleteService.getPlacePredictions(options, resolve));

export default class Location extends Component {
  state = {
    value: this.props.value, // eslint-disable-line react/destructuring-assignment
    options: [],
    valueChanged: false,
  };

  getPlacePredictions = async (value) => {
    if (value) {
      this.setState({ options: (await getPlacePredictions({ input: value })).map(place => ({ value: place.description, label: place.description })) });
    }
  }

  onFocus = () => {
    const { value } = this.state;

    this.getPlacePredictions(value);
  }

  onChange = (event) => {
    this.setState({ value: event.target.value, valueChanged: true }, () => {
      const { value } = this.state;

      this.getPlacePredictions(value);
    });
  }

  onBlur = (event) => {
    const { onChange } = this.props;
    const { valueChanged } = this.state;

    if (valueChanged) {
      onChange(event.target.value);
    }
  }

  render = () => {
    const { onChange } = this.props;
    const { value, options } = this.state;

    return (
      <Dropdown
        label="Location"
        options={options}
        value={value}
        onChange={(v) => { this.setState({ value: v }, () => onChange(v)); }}
      >
        <Input type="text" onFocus={this.onFocus} onChange={this.onChange} onBlur={this.onBlur} value={value} />
      </Dropdown>
    );
  }
}

Location.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

Location.defaultProps = {
  value: "London, UK",
};
