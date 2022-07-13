import React from 'react';
import { Link } from 'react-router-dom';
import { Typography } from '../../../ui';

const LinkToProfilePage = () => {
  return (
    <Link to="/profile">
      <Typography>Профиль</Typography>
    </Link>
  );
};

export default LinkToProfilePage;
