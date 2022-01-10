import PropTypes from 'prop-types';
import logoDefualt from '../assets/logo.svg';
import logoNoColor from '../assets/logoNoColor.svg';
import longLogo from '../assets/longLogo.svg';
import logoMenuAdaptive from '../assets/menu.svg'

export const Logo = ({ noColor, long, menuLogo }) => {
  let logo = logoDefualt;

  if (noColor) {
    logo = logoNoColor;
  }
  if (long) {
    logo = longLogo;
  }
  if (menuLogo) {
    logo = logoMenuAdaptive;
  }

  return <img src={logo} alt="" />;
};

Logo.propTypes = {
  noColor: PropTypes.bool,
  long: PropTypes.bool,
  menuLogo: PropTypes.bool,
};

Logo.defaultProps = {
  noColor: false,
  long: false,
  menuLogo: false
};
