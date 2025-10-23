import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import { useRegisterMutation } from 'shared/api';
import { useAppDispatch, useAppSelector } from 'shared/hook';
import { pathKeys } from 'shared/lib';
import { authActions, authSelector } from 'shared/model';
import { RegisterDataType } from 'shared/types/profile.type';

export const useRegister = () => {
  const navigate = useNavigate();

  const isFetching = useAppSelector(authSelector.getIsFetching);
  const globalError = useAppSelector(authSelector.getAuthGlobalError);

  const [registerUser] = useRegisterMutation();

  const dispatch = useAppDispatch();

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
