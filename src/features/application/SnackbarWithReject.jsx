import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closeSnackbar, selectSnackbarState } from './applicationSlice';
import SnackbarWrapper from '../../components/ui/Snackbar/SnackbarWrapper';
import Snackbar from '../../components/ui/Snackbar/Snackbar';
import { Alert } from '../../components/ui/Alert';

const SnackbarWithReject = () => {
  const snackbarErrors = useSelector(selectSnackbarState);

  const dispatch = useDispatch();

  const handleCloseSnackbar = (index) => {
    dispatch(closeSnackbar(index));
  };

  const generateKey = (pre) => {
    return `${pre}_${new Date().getTime()}`;
  };

  return (
    <div>
      <SnackbarWrapper>
        {snackbarErrors.map((item, index) => {
          return (
            <Snackbar key={generateKey(item + index)}>
              <Alert color="danger" onClose={() => handleCloseSnackbar(index)}>
                {item}
              </Alert>
            </Snackbar>
          );
        })}
      </SnackbarWrapper>
    </div>
  );
};

export default SnackbarWithReject;
