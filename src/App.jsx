import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import styled from "styled-components";

import VehiclesApi from "./api/vehicles";

import VehicleCard from "./components/VehicleCard";

const VehiclesRow = styled(Row)`
  margin: 0 -16px;

  & > * {
    padding: 16px;
    box-sizing: border-box;
  }
`;

class App extends Component {
  constructor() {
    super();

    this.state = {
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
  }

  async componentDidMount() {
    const { searchParams } = this.state;

    try {
      this.setState({ searchRes: await VehiclesApi.search(searchParams) });
      console.log(this.state.searchRes);
    } catch (e) {
      // TODO: Add error message
    }
  }

  render() {
    const { searchRes } = this.state;

    return (
      <Container>
        <VehiclesRow>
          {searchRes && searchRes.data.map(vehicle => (
            <Col xs="12" sm="6" lg="4">
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
      </Container>
    );
  }
}

export default App;
