import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import styled from "styled-components";
import _ from "lodash";
import cleanDeep from "clean-deep";

import VehiclesApi from "./api/vehicles";

import Dropdown from "./components/Dropdown";
import RangeSlider from "./components/RangeSlider";
import Sort from "./components/Sort";
import VehicleCard from "./components/VehicleCard";
import LoadingCloak from "./components/LoadingCloak";

const ContentCol = styled(Col)`
  position: relative;
`;

const VehiclesRow = styled(Row)`
  margin: 0 -8px;

  & > * {
    padding: 8px;
    box-sizing: border-box;
  }
`;

const FilterCol = styled(Col)`
  > *:not(:first-child) {
    margin-top: 32px;
  }
`;

class App extends Component {
  state = {
    searchParams: {
      // location: "London, Uk",
      // number_of_weeks: 52,
      // number_of_months: 12,
      // start_date: "03/01/2019",
      // subscription_start_days: 30,
      // rolling: false,
      // vehicle_type: "Consumer",
      // price_min: 100,
      // price_max: 3000,
      // per_page: 30,
      // page: 1,
      // order_by: "recommended",
      // order_direction: "asc",
      // max_distance: 1000,
      // tags: {},
      // number_of_seats_min: 2,
      // number_of_seats_max: 9,
      // sending_coordinates: true,
      vehicle_type: "Consumer",
      price_min: 100,
      price_max: 3000,
      per_page: 30,
      page: 1,
    },
    searchRes: null,
    loading: false,
  };

  componentDidMount = () => {
    this.search();
  }

  generateOptions = (path) => {
    const { searchRes } = this.state;

    const data = _.get(searchRes, path);

    if (!data) return [];

    const options = _.map(data, (count, make) => ({ label: `${make} (${count})`, value: make }));

    return options.sort((a, b) => {
      const nameA = a.label.toLowerCase(); const
        nameB = b.label.toLowerCase();
      if (nameA < nameB) { return -1; }
      if (nameA > nameB) { return 1; }
      return 0;
    });
  }

  updateSearchParams = (params) => {
    this.setState(state => ({ searchParams: { ...state.searchParams, ...params } }), this.search);
  }

  search = () => {
    const { searchParams } = this.state;

    try {
      this.setState({ loading: true }, async () => this.setState({ searchRes: await VehiclesApi.search(cleanDeep(searchParams)) }, () => this.setState({ loading: false })));
      console.log(this.state.searchRes);
    } catch (e) {
      // TODO: Add error message
    }
  }

  render = () => {
    const { searchParams, searchRes, loading } = this.state;

    return searchRes
      ? (
        <Container className="py-3">
          <Row>
            <FilterCol xs="12" lg="3">
              <RangeSlider
                label="Monthly Budget"
                valuesFormater={values => `£${values[0]} - £${values[1]}`}
                onChange={values => this.updateSearchParams({ price_min: values[0], price_max: values[1] })}
              />

              <Dropdown
                anyOption
                label="Car Make"
                options={this.generateOptions("metadata.aggregations.vehicle_make")}
                value={searchParams.vehicle_make}
                onChange={value => this.updateSearchParams({ vehicle_make: value, vehicle_model_group: "" })}
              />
              <Dropdown
                anyOption
                label="Car Model"
                options={this.generateOptions("metadata.aggregations.vehicle_model_group")}
                value={searchParams.vehicle_model_group}
                onChange={value => this.updateSearchParams({ vehicle_model_group: value })}
                disabled={!searchParams.vehicle_make}
              />
            </FilterCol>
            <ContentCol xs="12" lg="9">
              {loading && <LoadingCloak />}
              <Row className="justify-content-between">
                <Col xs="12" lg="6">
                  <h2>{_.get(searchRes, "metadata.total_count")} {_.get(searchRes, "metadata.total_count") === 1 ? " car available" : " cars available"}</h2>
                </Col>
                <Col xs="12" lg="4">
                  <Sort onChange={value => this.updateSearchParams(value)} />
                </Col>
              </Row>
              <VehiclesRow>
                {searchRes && searchRes.data.map(vehicle => (
                  <Col xs="12" sm="6" lg="4" key={vehicle.id}>
                    <VehicleCard
                      image={_.get(vehicle, "stock_image.image_url")}
                      year={vehicle.year}
                      make={vehicle.vehicle_make}
                      model={vehicle.vehicle_model}
                      brandNew={vehicle.brand_new}
                      pricePerMonth={vehicle.price_discount_and_deposit_schedule_hash[1].subtotal_price_pounds}
                    />
                  </Col>
                ))}
              </VehiclesRow>
            </ContentCol>
          </Row>
        </Container>
      )
      : <div />;
  }
}

export default App;
