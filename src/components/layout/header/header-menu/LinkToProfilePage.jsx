import React from 'react';
import { Link } from 'react-router-dom';
import { Typography } from 'antd';

const LinkToProfilePage = () => {
  return (
    <Link to="/profile" component={Typography.Link}>
      Профиль
    </Link>
  );
};

export default LinkToProfilePage;
