import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const TagContainer = styled.div`
  background-color: #001eff;
  color: white;
  font-size: 13px;
  height: 30px;
`;

export default function Tag({ className, text }) {
  return (
    <TagContainer className={`${className} d-flex flex-row align-items-center justify-content-center px-2`}>
      <span>{text}</span>
    </TagContainer>
  );
}

Tag.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
};

Tag.defaultProps = {
  className: "",
};
