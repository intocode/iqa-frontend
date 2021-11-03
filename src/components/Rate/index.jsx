import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledRate = styled.div`
  font-weight: bold;
  font-size: 14px;
  line-height: 16px;
  color: ${(props) => props.theme.colors.gray.main};

  span {
    margin: 0 10px;
    color: ${(props) => {
      if (props.currentRate > 0) {
        return props.theme.colors.success.main;
      }

      if (props.currentRate < 0) {
        return props.theme.colors.danger.main;
      }

      return props.theme.colors.gray.main;
    }};
  }

  button {
    background: none;
    border: none;
    cursor: pointer;
  }
`;

const StyledArrowButton = styled.button`
  svg {
    fill: ${(props) => {
      if (props.isUpped) {
        return props.theme.colors.success.main;
      }

      if (props.isDowned) {
        return props.theme.colors.danger.main;
      }

      return props.theme.colors.gray.main;
    }};
  }
`;

export const Rate = ({
  onUp,
  onDown,
  currentRate,
  isUpped,
  isDowned,
  ...props
}) => (
  <StyledRate {...props} currentRate={currentRate}>
    <StyledArrowButton isUpped={isUpped} onClick={onUp}>
      <svg
        width="14"
        height="8"
        viewBox="0 0 14 8"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6.6459 0.646008C6.69234 0.599445 6.74752 0.562502 6.80827 0.537296C6.86901 0.512089 6.93413 0.499115 6.9999 0.499115C7.06567 0.499115 7.13079 0.512089 7.19153 0.537296C7.25228 0.562502 7.30745 0.599445 7.3539 0.646008L13.3539 6.64601C13.4478 6.7399 13.5005 6.86723 13.5005 7.00001C13.5005 7.13278 13.4478 7.26012 13.3539 7.35401C13.26 7.4479 13.1327 7.50064 12.9999 7.50064C12.8671 7.50064 12.7398 7.4479 12.6459 7.35401L6.9999 1.70701L1.3539 7.35401C1.26001 7.4479 1.13267 7.50064 0.999899 7.50064C0.867123 7.50064 0.739786 7.4479 0.645899 7.35401C0.552013 7.26012 0.499268 7.13278 0.499268 7.00001C0.499268 6.86723 0.552013 6.7399 0.645899 6.64601L6.6459 0.646008Z"
        />
      </svg>
    </StyledArrowButton>
    <span>{currentRate}</span>
    <StyledArrowButton isDowned={isDowned} onClick={onDown}>
      <svg
        width="14"
        height="8"
        viewBox="0 0 14 8"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.3541 7.35399C7.30766 7.40055 7.25248 7.4375 7.19173 7.4627C7.13099 7.48791 7.06587 7.50088 7.0001 7.50088C6.93433 7.50088 6.86921 7.48791 6.80847 7.4627C6.74772 7.4375 6.69255 7.40055 6.6461 7.35399L0.646102 1.35399C0.552215 1.2601 0.49947 1.13277 0.49947 0.99999C0.49947 0.867214 0.552215 0.739877 0.646102 0.64599C0.739988 0.552103 0.867326 0.499359 1.0001 0.499359C1.13288 0.499359 1.26022 0.552103 1.3541 0.64599L7.0001 6.29299L12.6461 0.645991C12.74 0.552104 12.8673 0.49936 13.0001 0.49936C13.1329 0.49936 13.2602 0.552104 13.3541 0.645991C13.448 0.739878 13.5007 0.867216 13.5007 0.999991C13.5007 1.13277 13.448 1.2601 13.3541 1.35399L7.3541 7.35399Z"
        />
      </svg>
    </StyledArrowButton>
  </StyledRate>
);

Rate.propTypes = {
  onUp: PropTypes.func.isRequired,
  onDown: PropTypes.func.isRequired,
  currentRate: PropTypes.number.isRequired,
  isUpped: PropTypes.bool,
  isDowned: PropTypes.bool,
  color: PropTypes.oneOf(['danger', 'gray', 'warning', 'success']),
};

Rate.defaultProps = {
  isUpped: false,
  isDowned: false,
  color: 'gray',
};
