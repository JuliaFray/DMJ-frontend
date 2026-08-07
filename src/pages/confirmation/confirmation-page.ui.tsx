import React, { useEffect } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import { Snackbar } from '@mui/material';

import { useLazyConfirmQuery } from 'shared/api';
import { useAppDispatch, useAppSelector } from 'shared/hook';
import { pathKeys } from 'shared/lib';
import { authActions, authSelector } from 'shared/model';
import { Spinner } from 'shared/ui';

export const ConfirmationPage = () => {
  const { email, token } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isFetching = useAppSelector(authSelector.getIsFetching);

  const [confirmEmail] = useLazyConfirmQuery();

  useEffect(() => {
    if (email && token) {
      confirmEmail({ email, token });
    }
  }, [confirmEmail, email, token]);

  const handleClose = () => {
    dispatch(authActions.setShowSuccessSend(false));
    navigate(pathKeys.login());
  };

  return (
    <>
      <Spinner display={isFetching} />
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={!isFetching}
        autoHideDuration={3000}
        onClose={handleClose}
        message='Ваш аккаунт успешно подтвержден'
      />
    </>
  );
};
