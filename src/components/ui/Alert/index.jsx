import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import closeIcon from '../../assets/close.svg';
import { AVAILABLE_THEME_COLORS, DEFAULT_COLOR } from '../../../app/constants';

const StyledAlert = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 15px;

  /* fixme заменить на бордер */
  box-shadow: ${(props) => props.theme.colors[props.color].main} 0 0 0 1px inset;

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
    align-self: flex-start;
    margin-top: 5px;
    background-color: inherit;
    border: none;
    cursor: pointer;
  }
`;

export const Alert = ({ children, icon, onClose, ...props }) => {
  return (
    <StyledAlert {...props}>
      <div>
        {icon} {children}
      </div>
      {onClose && (
        // fixme заменить div на button,
        //  сделать cursor: pointer, сделать цвет икса как у текста
        <button type="button" onClick={onClose}>
          <img src={closeIcon} alt="" />
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
  icon: null,
  color: DEFAULT_COLOR,
  onClose: undefined,
  contrast: false,
};
