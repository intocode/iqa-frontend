import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../../common/context/Auth/useAuth';

const FavoritePopoverContent = () => {
  const { executeLoggingInProcess } = useAuth();

  return (
    <div>
      <p className="p-0 m-0">
        <Link to="/" onClick={executeLoggingInProcess}>
          Авторизуйся,
        </Link>
        чтобы иметь <br /> возможность сохранять вопросы
      </p>
    </div>
  );
};

export default FavoritePopoverContent;
