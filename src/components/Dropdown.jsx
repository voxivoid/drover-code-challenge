import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import {
  Dropdown as BSDropdown, DropdownToggle, DropdownMenu, DropdownItem,
} from "reactstrap";

const Label = styled.label`
  font-size: 16px;
`;

const DropdownToggleStyled = styled(DropdownToggle)`
  width: 100%;
  text-align: left;
  padding: 0px 10px;
  border: 1px solid #000;
  height: 40px;
  cursor: pointer;

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

  &:hover {
    background-color: #f9f6ed;
  }
`;

export default class Dropdown extends React.Component {
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
    const { label, value } = this.props;
    const { dropdownOpen } = this.state;

    const options = this.getOptions();

    return (
      <div className="d-flex flex-column">
        <Label>{label}</Label>
        <BSDropdown isOpen={dropdownOpen} toggle={this.toggle}>
          <DropdownToggleStyled
            tag="span"
            className="d-flex flex-row align-items-center justify-content-between"
            onClick={this.toggle}
            data-toggle="dropdown"
            aria-expanded={dropdownOpen}
          >
            <span>{options.find(option => option.value === value).label}</span>
            <i className="fas fa-caret-down" />
          </DropdownToggleStyled>
          <DropdownMenuStyled>
            {options.map(option => (
              <DropdownItemStyled
                key={option.value}
                onClick={() => this.select(option)}
              >
                {option.label}
              </DropdownItemStyled>
            ))}
          </DropdownMenuStyled>
        </BSDropdown>
      </div>
    );
  }
}

Dropdown.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired,
  anyOption: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

Dropdown.defaultProps = {
  anyOption: false,
  value: "",
};
