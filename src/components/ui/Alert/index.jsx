import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import CloseIcon from '../../icons/CloseIcon';
import { AVAILABLE_THEME_COLORS, DEFAULT_COLOR } from '../../../app/constants';

const StyledAlert = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 10px;

  border: 1px solid transparent;
  border-color: ${(props) => props.theme.colors[props.color].main};

  border-radius: 4px;

  /* инверсия цветов для contrast=true */
  ${(props) => {
    if (props.contrast) {
      return css`
        color: white;
        background-color: ${props.theme.colors[props.color].main};
      `;
    }

    return css`
      color: ${props.theme.colors[props.color].main};
      background-color: ${props.theme.colors[props.color].addition};
    `;
  }}

  button {
    background-color: inherit;
    border: none;
    cursor: pointer;
  }
`;

export const Alert = ({ children, icon, onClose, ...props }) => {
  return (
    <StyledAlert {...props}>
      {icon} {children}
      {onClose && (
        <button type="button" onClick={onClose}>
          <CloseIcon />
        </button>
      )}
    </StyledAlert>
  );
};

Alert.propTypes = {
  icon: PropTypes.node,
  children: PropTypes.string.isRequired,
  contrast: PropTypes.bool,
  color: PropTypes.oneOf(AVAILABLE_THEME_COLORS),
  onClose: PropTypes.func,
};

Alert.defaultProps = {
  icon: undefined,
  color: DEFAULT_COLOR,
  onClose: undefined,
  contrast: false,
};
