import { useContext, useEffect } from 'react';

import * as Yup from 'yup';

import { useLoginMutation } from 'shared/api';
import { ProfileContext } from 'shared/context';
import { useAppDispatch, useAppSelector, useWebSocket } from 'shared/hook';
import { SocketEvents } from 'shared/lib';
import { authActions, authSelector } from 'shared/model';
import { ILoginData } from 'shared/types';

export const useLogin = () => {
  const { authId, isAuth } = useContext(ProfileContext);

  const isFetching = useAppSelector(authSelector.getIsFetching);
  const globalError = useAppSelector(authSelector.getAuthGlobalError);

  const ws = useWebSocket();
  const dispatch = useAppDispatch();

  const [login] = useLoginMutation();

  useEffect(() => {
    if (authId) {
      ws?.send(JSON.stringify({ type: SocketEvents.AUTH_EVENT, id: authId }));
    }
  }, [authId, ws]);

  const handleSubmit = (formData: ILoginData) => {
    login({ data: formData });
  };

  const handleChange = () => {
    dispatch(authActions.setGlobalError(null));
  };

  const initialData = { email: '', password: '' };
  const validation = Yup.object().shape({
    email: Yup.string().required('Обязательно для заполнения').email('Неверный формат почты'),
    password: Yup.string().required('Обязательно для заполнения'),
  });

  return { initialData, validation, isAuth, isFetching, globalError, handleSubmit, handleChange };
};
