import PropTypes from 'prop-types';
import logoDefualt from '../assets/logo.svg';
import logoNoColor from '../assets/logoNoColor.svg';
import longLogo from '../assets/longLogo.svg';

export const Logo = ({ noColor, long }) => {
  let logo = logoDefualt;

  if (noColor) {
    logo = logoNoColor;
  }
  if (long) {
    logo = longLogo;
  }

  return <img src={logo} alt="" className="d-block" />;
};

Logo.propTypes = {
  noColor: PropTypes.bool,
  long: PropTypes.bool,
};

Logo.defaultProps = {
  noColor: false,
  long: false,
};
