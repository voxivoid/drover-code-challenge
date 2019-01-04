import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import _ from "lodash";

import {
  Dropdown as BSDropdown, DropdownToggle, DropdownMenu, DropdownItem,
} from "reactstrap";

const Label = styled.label`
  color:  ${props => (props.disabled ? "#7a7a7a" : "#000")};
  ${props => props.labelInline && "margin-bottom 0; margin-right: 16px;"}
`;

const DropdownStyled = styled(BSDropdown)`
  width: 100%;
`;

const DropdownToggleStyled = styled(DropdownToggle)`
  width: 100%;
  text-align: left;
  padding: 0px 10px;
  border:  ${props => (props.disabled ? "1px solid #bfbfbf" : "1px solid #000")};
  color:  ${props => (props.disabled ? "#dedede" : "#000")};
  pointer-events:  ${props => (props.disabled ? "none" : "auto")};
  height: 40px;
  cursor: pointer;

  ${props => (props.disabled ? "#c8c8c8" : "white")};

  i {
    font-size: 20px;
    color: #061ab1;
  }
`;

const DropdownMenuStyled = styled(DropdownMenu)`
  width: 100%;
  border-radius: 0;
  border: 1px solid black;
  box-shadow: #0000001a 0px 2px 8px 0px;
  max-height: 280px;
  overflow: auto;
  padding: 0;

  button:not(:first-child) {
    border-top: 1px solid black
  }
`;

const DropdownItemStyled = styled(DropdownItem)`
  min-height: 40px;
  white-space: pre-wrap;

  &:hover {
    background-color: #f9f6ed;
  }
`;

export default class Dropdown extends Component {
  state = {
    dropdownOpen: false,
  }

  getOptions = () => {
    const { options, anyOption } = this.props;
    if (anyOption) {
      return [{ label: "Any", value: "" }].concat(options);
    }
    return options;
  }

  toggle = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen,
    }));
  }

  select = (option) => {
    const { onChange } = this.props;

    this.toggle();

    onChange(option.value);
  }

  render = () => {
    const {
      label, value, disabled, labelInline, children,
    } = this.props;
    const { dropdownOpen } = this.state;

    const options = this.getOptions();

    return (
      <div className={`d-flex ${labelInline ? "flex-row align-items-center" : "flex-column"}`}>
        <Label labelInline={labelInline} disabled={disabled}>{label}</Label>
        <DropdownStyled isOpen={dropdownOpen} toggle={this.toggle}>

          <DropdownToggleStyled
            tag="div"
            onClick={this.toggle}
            data-toggle="dropdown"
            aria-expanded={dropdownOpen}
            disabled={disabled}
          >
            {children
            || (
              <div className="d-flex flex-row align-items-center justify-content-between" style={{ height: "100%" }}>
                <span>{_.get(options.find(option => option.value === value), "label")}</span>
                <i className="fas fa-caret-down" />
              </div>
            )
            }
          </DropdownToggleStyled>
          <DropdownMenuStyled style={!(options && options.length) ? { display: "none" } : {}}>
            {options.map(option => (
              <DropdownItemStyled
                key={option.value}
                onClick={() => this.select(option)}
              >
                {option.label}
              </DropdownItemStyled>
            ))}
          </DropdownMenuStyled>
        </DropdownStyled>
      </div>
    );
  }
}

Dropdown.propTypes = {
  label: PropTypes.string.isRequired,
  labelInline: PropTypes.bool,
  value: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired,
  anyOption: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  children: PropTypes.node,
};

Dropdown.defaultProps = {
  labelInline: false,
  value: "",
  anyOption: false,
  disabled: false,
  children: null,
};
