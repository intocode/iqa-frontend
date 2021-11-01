import React from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import closeIcon from "../../assets/close.svg";

const StyledTag = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 4px;
  padding: 5px 8px;
  
  ${(props) => {
    return css`
      color: ${props.theme.colors[props.color].main};
      background-color: ${props.theme.colors[props.color].addition};
      border: 1px solid ${props.theme.colors[props.color].main};
    `;
  }}
  
  & .closeIcon {
  margin-left: 12px;
  display: inherit;
`;

export const Tag = ({ children, onRemove, ...props }) => {
  return (
    <StyledTag {...props}>
      {children}
      {onRemove && (
        <div className="closeIcon" onClick={onRemove}>
          <img src={closeIcon} alt="" />
        </div>
      )}
    </StyledTag>
  );
};

Tag.propTypes = {
  children: PropTypes.string.isRequired,
  color: PropTypes.oneOf(["danger", "gray", "warning", "success"]),
  onRemove: PropTypes.func,
};

Tag.defaultProps = {
  color: "success",
};
