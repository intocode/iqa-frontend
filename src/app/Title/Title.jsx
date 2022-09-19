import { useEffect } from 'react';
import PropTypes from 'prop-types';

export const Title = ({ children }) => {
  useEffect(() => {
    const title = document.querySelector('title');

    if (title) {
      title.textContent = children;
    } else {
      const node = document.createElement('title', { textContent: children });
      document.head.append(node);
    }
  }, [children]);

  return null;
};

Title.defaultProps = {
  children: '',
};

Title.propTypes = {
  children: PropTypes.string,
};
