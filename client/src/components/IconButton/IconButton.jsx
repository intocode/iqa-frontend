import React from "react";
import styled from "styled-components";
import save from "../assets/Icon.svg";
import check from "../assets/check.svg";
import search from "../assets/search.svg";
import PropTypes from "prop-types";

const StyledIconButton = styled.button`
  width: 40px;
  height: 40px;
  cursor: pointer;
  border: ${(props) =>
    props.theme.colors[props.color] === "search"
      ? "1px solid #E4E7ED"
      : "none"};
  border-radius: 100px;
  padding: 13px;
  background-color: ${(props) => {
    return props.theme.colors[props.color].backgroundColor;
  }};
`;

export const IconButton = ({ color }) => {
  const variantIcon =
    color === "success" ? check : color === "search" ? search : save;
  return (
    <StyledIconButton color={color}>
      <img src={variantIcon} alt="" />
    </StyledIconButton>
  );
};

IconButton.propTypes = {
  color: PropTypes.string,
};

IconButton.defaultProps = {
  color: "primary",
};
