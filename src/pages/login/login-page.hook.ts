import { useEffect } from 'react';

import * as Yup from 'yup';

import { useAppDispatch, useAppSelector, useWebSocket } from 'shared/hook';
import { SocketEvents } from 'shared/lib';
import {
  authActions,
  getAuthGlobalError,
  getAuthId,
  getIsAuth,
  getIsFetching,
  login,
} from 'shared/model';
import { ILoginData } from 'shared/types';

export const useLogin = () => {
  const isAuth = useAppSelector(getIsAuth);
  const isFetching = useAppSelector(getIsFetching);
  const globalError = useAppSelector(getAuthGlobalError);
  const authId = useAppSelector(getAuthId);

  const ws = useWebSocket();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (authId) {
      ws?.send(JSON.stringify({ type: SocketEvents.AUTH_EVENT, id: authId }));
    }
  }, [authId, ws]);

  const handleSubmit = (formData: ILoginData) => {
    dispatch(login({ userData: formData }));
  };

  const handleChange = () => {
    dispatch(authActions.setGlobalError(''));
  };

  const initialData = { email: '', password: '' };
  const validation = Yup.object().shape({
    email: Yup.string().required('Обязательно для заполнения').email('Неверный формат почты'),
    password: Yup.string().required('Обязательно для заполнения'),
  });

  return { initialData, validation, isAuth, isFetching, globalError, handleSubmit };
};
