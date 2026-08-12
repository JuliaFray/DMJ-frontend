import { useEffect } from 'react';

import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import { useRegisterMutation } from 'shared/api';
import { useAppDispatch, useAppSelector } from 'shared/hook';
import { pathKeys } from 'shared/lib';
import { authActions, authSelector } from 'shared/model';
import { RegisterDataType } from 'shared/types';

export const useRegister = () => {
  const navigate = useNavigate();

  const isFetching = useAppSelector(authSelector.getIsFetching);

  const [registerUser, { isSuccess }] = useRegisterMutation();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isSuccess) {
      navigate(pathKeys.login());
    }
    return () => {
      dispatch(authActions.setShowSuccessSend(false));
    };
  }, [dispatch, isSuccess]);

  const handleOnChange = () => {
    dispatch(authActions.setErrors({}));
    dispatch(authActions.setGlobalError(null));
  };

  const handleSubmit = (formData: RegisterDataType) => {
    registerUser({ data: formData });
  };

  const formikConfig = useFormik({
    initialValues: { login: '', email: '', password: '' } as RegisterDataType,
    onSubmit: (formData: RegisterDataType) => handleSubmit(formData),
    enableReinitialize: true,
  });

  const validationSchema = Yup.object().shape({
    login: Yup.string().required('Обязательно для заполнения'),
    email: Yup.string().required('Обязательно для заполнения').email('Неверный формат почты'),
    password: Yup.string().required('Обязательно для заполнения'),
  });

  return {
    formikConfig,
    validationSchema,
    isFetching,
    handleSubmit,
    handleOnChange,
  };
};
