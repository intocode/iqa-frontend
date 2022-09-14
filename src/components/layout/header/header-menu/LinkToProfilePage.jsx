import React from 'react';
import { Link } from 'react-router-dom';
import { Typography } from 'antd';

const LinkToProfilePage = () => {
  return (
    <Link to="/profile">
      <Typography.Link>Профиль</Typography.Link>
    </Link>
  );
};

export default LinkToProfilePage;
