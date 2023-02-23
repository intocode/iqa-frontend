import { Popover } from 'antd';
import { useAuth } from 'common/context/Auth/useAuth';
import PropTypes from 'prop-types';
import FavoritePopoverContent from 'components/FavoritePopoverContent';

export const FavoritePopover = ({ children }) => {
  const { token } = useAuth();

  if (!token) {
    return (
      <Popover
        placement="bottomLeft"
        trigger="click"
        content={<FavoritePopoverContent text="чтобы иметь возможность сохранять вопросы" />}
      >
        {children}
      </Popover>
    );
  }

  return children;
};

FavoritePopover.propTypes = {
  children: PropTypes.node.isRequired,
};
