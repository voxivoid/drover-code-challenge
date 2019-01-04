import React from "react";
import styled from "styled-components";

const Cloak = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  background-color: rgba(255, 255, 255, 0.5);

  i {
    position: relative;
    top: 50vh;
    font-size: 60px;
    transform-origin: center center;
    animation: spin 1s ease-in-out infinite;
    align-self: flex-start;
    color: #001eff;

    @keyframes spin {
      100% {
        transform: rotate(360deg);
      }
    }
  }
`;

export default function Tag() {
  return (
    <Cloak className="d-flex flex-row justify-content-center">
      <i className="fas fa-spinner" />
    </Cloak>
  );
}
