import PropTypes from 'prop-types';
import LogoIcon from '../icons/LogoIcon';
import LogoNoColorIcon from '../icons/LogoNoColorIcon';
import LongLogoIcon from '../icons/LongLogoIcon';

export const Logo = ({ noColor, long }) => {
  let logo = <LogoIcon />;

  if (noColor) {
    logo = <LogoNoColorIcon />;
  }
  if (long) {
    logo = <LongLogoIcon />;
  }

  return logo;
};

Logo.propTypes = {
  noColor: PropTypes.bool,
  long: PropTypes.bool,
};

Logo.defaultProps = {
  noColor: false,
  long: false,
};
