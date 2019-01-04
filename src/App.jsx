import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import styled from "styled-components";
import _ from "lodash";
import cleanDeep from "clean-deep";

import VehiclesApi from "./api/vehicles";

import Dropdown from "./components/Dropdown";
import LoadingCloak from "./components/LoadingCloak";
import Location from "./components/Location";
import Pagination from "./components/Pagination";
import RangeSlider from "./components/RangeSlider";
import Sort from "./components/Sort";
import VehicleCard from "./components/VehicleCard";

const ContainerStyled = styled(Container)`
  @media (max-width: 992px) {
    padding-bottom: 70px !important;
  }
`;

const ContentCol = styled(Col)`
  position: relative;

  @media (max-width: 992px) {
    ${props => (props.refineSearch && "display: none;")};
  }
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

  @media (max-width: 992px) {
    ${props => (!props.refineSearch && "display: none;")};
  }
`;

const RefineSearch = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 10px 20px;
  background-color: #50ff7d;
  text-align: center;
  z-index: 9999;
  cursor: pointer;

  &:hover {
    background-color: #00ca4d;
    border: medium none;
    color: #000;
  }

  @media (min-width: 992px) {
    display: none;
  }
`;

class App extends Component {
  state = {
    searchParams: {
      vehicle_type: "Consumer",
      price_min: 100,
      price_max: 3000,
      per_page: 30,
      page: 1,
      location: "London, UK",
    },
    searchRes: null,
    loading: false,
    refineSearch: false,
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
    this.setState(state => ({ searchParams: { ...state.searchParams, ...params, page: params.page || 1 } }), this.search);
  }

  search = () => {
    const { searchParams } = this.state;

    try {
      this.setState({ loading: true },
        async () => this.setState({ searchRes: await VehiclesApi.search(cleanDeep(searchParams)) },
          () => this.setState({ loading: false })));
    } catch (e) {
      // TODO: Add error message
    }
  }

  render = () => {
    const {
      searchParams, searchRes, loading, refineSearch,
    } = this.state;

    return searchRes
      ? (
        <ContainerStyled className="py-3">
          <Row>
            <FilterCol refineSearch={refineSearch} xs="12" lg="3">
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
              <Location
                value={searchParams.location}
                onChange={value => this.updateSearchParams({ location: value })}
              />
            </FilterCol>
            <ContentCol refineSearch={refineSearch} xs="12" lg="9">
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
              <div className="d-flex flex-column align-items-center">
                <p>Showing {(searchParams.page - 1) * searchParams.per_page + 1}-{searchParams.page * searchParams.per_page} of {_.get(searchRes, "metadata.total_count")} results</p>
                <Pagination
                  activePage={searchParams.page}
                  itemsCountPerPage={searchParams.per_page}
                  totalItemsCount={_.get(searchRes, "metadata.total_count")}
                  pageRangeDisplayed={4}
                  onChange={page => this.updateSearchParams({ page })}
                />
              </div>
            </ContentCol>
          </Row>
          <RefineSearch onClick={() => this.setState({ refineSearch: !refineSearch })}>
            {refineSearch ? "Update search and hide filter" : "Refine your search"}
          </RefineSearch>
        </ContainerStyled>
      )
      : <div />;
  }
}

export default App;
