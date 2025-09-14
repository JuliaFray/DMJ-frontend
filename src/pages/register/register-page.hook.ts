import { useSelector } from 'react-redux';
import * as Yup from 'yup';

import { useAppDispatch } from 'shared/hook';
import {
  authActions,
  getAuthFetching,
  getAuthGlobalError,
  getIsAuth,
  registerUser,
} from 'shared/model';

import { RegisterDataType } from './register-page.ui';

export const useRegister = () => {
  const isAuth = useSelector(getIsAuth);
  const isFetching = useSelector(getAuthFetching);
  const globalError = useSelector(getAuthGlobalError);

  const dispatch = useAppDispatch();

  const initialData = { firstName: '', secondName: '', email: '', password: '' };
  const validation = Yup.object().shape({
    firstName: Yup.string().required('Обязательно для заполнения'),
    secondName: Yup.string().required('Обязательно для заполнения'),
    email: Yup.string().required('Обязательно для заполнения').email('Неверный формат почты'),
    password: Yup.string().required('Обязательно для заполнения'),
  });

  // const handleOnChange = () => {
  //   dispatch(authActions.setErrors({}));
  //   dispatch(authActions.setGlobalError(''));
  // };

  const handleSubmit = (formData: RegisterDataType) => {
    dispatch(registerUser({ userData: formData }));
  };

  return { initialData, validation, isAuth, isFetching, globalError, handleSubmit };
};
