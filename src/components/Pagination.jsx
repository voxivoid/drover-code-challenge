import React from "react";
import styled from "styled-components";
import Pagination from "react-js-pagination";

const PaginationContainer = styled.div`
  .pagination {
    margin-bottom: 0;
  }

  .item {
    border: 1px solid #000;
    padding: 10px;
    background-color: #fff;
    height: 30px;
    width: 30px;
    line-height: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &:not(:last-child) {
      margin-right: 2px;
    }

    .fa-backward, .fa-forward {
      font-size: 16px;
    }

    .fa-caret-left, .fa-caret-right {
      font-size: 20px;
    }

    a {
      color: #000;

      &:hover {
        text-decoration: none;
      }
    }

    &.active {
      background: #001eff;

      a {
        color: #fff;
      }
    }
  }

  .controller {
    border: 0;

    a {
      color: #001eff;
    }
  }
`;

export default function Tag(props) {
  return (
    <PaginationContainer>
      <Pagination
        {...props}
        prevPageText={<i className="fas fa-caret-left" />}
        nextPageText={<i className="fas fa-caret-right" />}
        firstPageText={<i className="fas fa-backward" />}
        lastPageText={<i className="fas fa-forward" />}
        itemClass="item"
        itemClassFirst="controller"
        itemClassLast="controller"
        itemClassPrev="controller"
        itemClassNext="controller"
      />
    </PaginationContainer>
  );
}
