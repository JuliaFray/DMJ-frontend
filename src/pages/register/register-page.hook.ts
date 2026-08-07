import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import { useRegisterMutation } from 'shared/api';
import { ErrorResponse, GenericResponseType } from 'shared/api/api-types';
import { useAppDispatch, useAppSelector } from 'shared/hook';
import { pathKeys } from 'shared/lib';
import { authActions, authSelector } from 'shared/model';
import { RegisterDataType } from 'shared/types/profile.type';

export const useRegister = () => {
  const navigate = useNavigate();

  const isFetching = useAppSelector(authSelector.getIsFetching);
  const globalError = useAppSelector(authSelector.getAuthGlobalError);

  const [registerUser, { error, data }] = useRegisterMutation();

  const dispatch = useAppDispatch();

  useEffect(() => {
    const err = error as GenericResponseType<ErrorResponse>;
    if (err?.data?.message) {
      dispatch(authActions.setGlobalError(err?.data?.message));
    }

    return () => {
      dispatch(authActions.setGlobalError(null));
    };
  }, [dispatch, error]);

  const initialData = { login: '', email: '', password: '' };
  const validation = Yup.object().shape({
    login: Yup.string().required('Обязательно для заполнения'),
    email: Yup.string().required('Обязательно для заполнения').email('Неверный формат почты'),
    password: Yup.string().required('Обязательно для заполнения'),
  });

  const handleOnChange = () => {
    dispatch(authActions.setErrors({}));
    dispatch(authActions.setGlobalError(null));
  };

  const handleSubmit = (formData: RegisterDataType) => {
    registerUser({ data: formData });
  };

  const handleClose = () => {
    dispatch(authActions.setShowSuccessSend(false));
    navigate(pathKeys.login());
  };

  return {
    initialData,
    validation,
    isFetching,
    globalError,
    handleSubmit,
    handleOnChange,
    handleClose,
  };
};
