import { Link } from 'react-router-dom';
import { useAuth } from '../../../../common/context/Auth/useAuth';
import { Typography } from '../../../ui';

export const LinkToFavorites = () => {
  const { token } = useAuth();

  const { REACT_APP_FEATURE_FAVORITES } = process.env;

  if (!REACT_APP_FEATURE_FAVORITES || !token) return null;

  return (
    <Link to="/?favoritesOnly=true" className="d-none d-md-block">
      <Typography>Сохраненные</Typography>
    </Link>
  );
};
