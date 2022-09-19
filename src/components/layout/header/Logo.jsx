import PropTypes from 'prop-types';
import LogoIcon from 'components/icons/LogoIcon';
import LogoNoColorIcon from 'components/icons/LogoNoColorIcon';
import LongLogoIcon from 'components/icons/LongLogoIcon';

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
