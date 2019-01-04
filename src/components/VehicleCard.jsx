import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Tag from "./Tag";

const Card = styled.div`
  background-color: #f5f5f5;
  width: 100%;
  cursor: pointer;
  transition: all .3s ease;
  height: 250px;

  p {
    font-size: 12px;
    margin: 0;
  }

  &:hover {
    box-shadow: #e4e3e3 0px 2px 4px;

    img {
      transform: scale(1);
    }
  }
`;

const BrandNewTag = styled(Tag)`
  position: absolute;
  top: 25px;
  left: 25px;
  z-index: 1;
`;

const Img = styled.img`
  transition: all .3s ease;
  width: 100%;
  max-height: 180px;
  object-fit: contain;
  transform: scale(0.9);
`;

export default function VehicleCard({
  image, year, make, model, brandNew, pricePerMonth,
}) {
  return (
    <Card className="d-flex flex-column justify-content-between p-3">
      {brandNew && <BrandNewTag text="Brand new!" />}

      <Img src={image} alt={`${make} ${model}`} />

      <div className="d-flex flex-row justify-content-between">
        <div className="d-flex flex-column">
          <h6>{year} {make}</h6>
          <p>{model}</p>
        </div>

        <div className="d-flex flex-column">
          <h5>£{Math.ceil(pricePerMonth)}</h5>
          <p>A month</p>
        </div>
      </div>
    </Card>
  );
}

VehicleCard.propTypes = {
  image: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  make: PropTypes.string.isRequired,
  model: PropTypes.string.isRequired,
  brandNew: PropTypes.bool.isRequired,
  pricePerMonth: PropTypes.number.isRequired,
};
