import { Link } from 'react-router-dom';
import { Typography } from 'antd';
import { useAuth } from '../../../../common/context/Auth/useAuth';

export const LinkToDeleted = () => {
  const { token } = useAuth();

  const { REACT_APP_FEATURE_DELETE_QUESTION } = process.env;

  if (!REACT_APP_FEATURE_DELETE_QUESTION || !token) return null;

  return (
    <Link to="/?deletedOnly=true" className="d-none d-md-block">
      <Typography.Link>Корзина</Typography.Link>
    </Link>
  );
};
