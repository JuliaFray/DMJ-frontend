import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { BASE_URL } from 'shared/api/api';
import { ResultCodes } from 'shared/api/api-types';

import { useAppDispatch, useAppSelector } from '../hook';
import { appActions, authActions, authSelector, profileActions, profileSelector } from '../model';
import { IUser, Nullable } from '../types';

export type TProfileContext = {
  isAuth: boolean;
  authId: Nullable<string>;
  me: Nullable<IUser>;
  isLoading: boolean;
};
export const ProfileContext = createContext<TProfileContext>({
  isAuth: false,
  authId: null,
  me: null,
  isLoading: false,
});

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useAppDispatch();

  const isAuth = useAppSelector(authSelector.getIsAuth);
  const authId = useAppSelector(authSelector.getAuthId);
  const me = useAppSelector(profileSelector.getMyProfile);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (token) {
          try {
            const url = new URL('/auth/status', BASE_URL);
            const response: any = await fetch(url, {
              headers: { Authorization: `Bearer ${token}` },
            });

            if (response.status === ResultCodes.Success) {
              const result = await response.json();
              dispatch(appActions.setInitialized());
              dispatch(profileActions.setProfile(result.data));
              dispatch(authActions.setAuth(result.data));
              setIsAuthenticated(true);
            } else {
              localStorage.removeItem('token');
              setIsAuthenticated(false);
            }
          } catch (error) {
            localStorage.removeItem('token');
            setIsAuthenticated(false);
          }
        }
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [dispatch, token]);

  useEffect(() => {
    if (token && isAuth) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [isAuth, token]);

  const contextValue = useMemo(
    () => ({
      isAuth: isAuthenticated,
      isLoading,
      authId,
      me,
    }),
    [authId, isAuthenticated, isLoading, me],
  );

  return <ProfileContext.Provider value={contextValue}>{children}</ProfileContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useAuth должен использоваться внутри AuthProvider');
  }
  return context;
};
