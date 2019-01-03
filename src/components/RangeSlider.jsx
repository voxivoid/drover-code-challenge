import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Range } from "rc-slider";

import "rc-slider/assets/index.css";

const Label = styled.label`
  color:  #000;
`;

const Values = styled.p`
  font-size: 16px;
`;

const RangeStyled = styled(Range)`
  .rc-slider-track {
    background-color: black;
  }
  .rc-slider-handle {
    background-color: #001eff;
    height: 16px;
    width: 16px;

    &, &:hover, &:focus {
      border: 0;
      box-shadow: none;
    }
  }
`;

export default class RangeSlider extends Component {
  state = {
    values: [100, 3000],
  }

  onChange = (values) => {
    this.setState({ values });
  }

  render = () => {
    const { label, valuesFormater, onChange } = this.props;
    const { values } = this.state;

    return (
      <div className="d-flex flex-column">
        <Label>{label}</Label>
        <Values>{valuesFormater(values)}</Values>
        <RangeStyled
          allowCross={false}
          defaultValue={values}
          min={100}
          max={3000}
          onChange={this.onChange}
          onAfterChange={() => onChange(values)}
        />
      </div>
    );
  }
}

RangeSlider.propTypes = {
  label: PropTypes.string.isRequired,
  valuesFormater: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};
