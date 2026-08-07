import React from 'react';

import { IUser, Nullable } from '../types';

export type TProfileContext = {
  isAuth: boolean;
  authId: Nullable<string>;
  me: Nullable<IUser>;
};
export const ProfileContext = React.createContext<TProfileContext>({
  isAuth: false,
  authId: null,
  me: null,
});
