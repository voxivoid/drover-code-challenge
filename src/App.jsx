import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import styled from "styled-components";
import _ from "lodash";

import VehiclesApi from "./api/vehicles";

import VehicleCard from "./components/VehicleCard";
import Dropdown from "./components/Dropdown";

const VehiclesRow = styled(Row)`
  margin: 0 -8px;

  & > * {
    padding: 8px;
    box-sizing: border-box;
  }
`;

class App extends Component {
  state = {
    searchParams: {
      location: "London, Uk",
      number_of_weeks: 52,
      number_of_months: 12,
      start_date: "03/01/2019",
      subscription_start_days: 30,
      rolling: false,
      vehicle_type: "Consumer",
      price_min: 100,
      price_max: 3000,
      per_page: 30,
      page: 1,
      order_by: "recommended",
      order_direction: "asc",
      max_distance: 1000,
      tags: {},
      number_of_seats_min: 2,
      number_of_seats_max: 9,
      sending_coordinates: true,
    },
    searchRes: null,
  };

  componentDidMount = async () => {
    const { searchParams } = this.state;

    try {
      this.setState({ searchRes: await VehiclesApi.search(searchParams) });
      console.log(this.state.searchRes);
    } catch (e) {
    // TODO: Add error message
    }
  }

  generateOptions = (path) => {
    const { searchRes } = this.state;

    const data = _.get(searchRes, path);

    if (!data) return null;

    return _.map(data, (count, make) => ({ label: `${make} (${count})`, value: make }));
  }

  updateSearchParams = (params) => {
    this.setState(state => ({ searchParams: { ...state.searchParams, ...params } }));
  }

  render = () => {
    const { searchParams, searchRes } = this.state;

    return searchRes
      ? (
        <Container className="py-3">
          <Row>
            <Col xs="12" lg="3">
              <Dropdown
                anyOption
                label="Car Make"
                options={this.generateOptions("metadata.aggregations.vehicle_make")}
                value={searchParams.vehicle_make}
                onChange={value => this.updateSearchParams({ vehicle_make: value })}
                disabled
              />
            </Col>
            <Col xs="12" lg="9">
              <VehiclesRow>
                {searchRes && searchRes.data.map(vehicle => (
                  <Col xs="12" sm="6" lg="4" key={vehicle.id}>
                    <VehicleCard
                      image={vehicle.stock_image.image_url}
                      year={vehicle.year}
                      make={vehicle.vehicle_make}
                      model={vehicle.vehicle_model}
                      brandNew={vehicle.brand_new}
                      pricePerMonth={vehicle.price_discount_and_deposit_schedule_hash[1].subtotal_price_pounds}
                    />
                  </Col>
                ))}
              </VehiclesRow>
            </Col>
          </Row>
        </Container>
      )
      : <div />;
  }
}

export default App;
