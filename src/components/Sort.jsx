import React, { Component } from "react";
import PropTypes from "prop-types";

import Dropdown from "./Dropdown";

const sortOptions = [
  {
    label: "Price - Low to High",
    value: "price-low-high",
    icon: "sort-amount-up",
  },
  {
    label: "Price - High to Low",
    value: "price-high-low",
    icon: "sort-amount-down",
  },
  {
    label: "Distance - Close To Far",
    value: "distance-close-far",
    icon: "sort-amount-up",
  },
  {
    label: "Recommended",
    value: "recommended",
    icon: "sort-amount-up",
  },
];
export default class Sort extends Component {
  state = {
    value: "recommended",
  }

  onChange = (value) => {
    const { onChange } = this.props;
    let sort;
    switch (value) {
      case "price-low-high":
        sort = {
          order_by: "price",
          order_direction: "asc",
        };
        break;

      case "price-high-low":
        sort = {
          order_by: "price",
          order_direction: "desc",
        };
        break;

      case "distance-close-far":
        sort = {
          order_by: "distance",
          order_direction: "asc",
        };
        break;

      default:
        sort = {
          order_by: "recommended",
          order_direction: "asc",
        };
    }

    this.setState({ value }, () => { onChange(sort); });
  }

  render = () => {
    const { value } = this.state;

    return (
      <Dropdown
        label="Sort"
        labelInline
        options={sortOptions}
        value={value}
        onChange={v => this.onChange(v)}
      />
    );
  }
}

Sort.propTypes = {
  onChange: PropTypes.func.isRequired,
};
