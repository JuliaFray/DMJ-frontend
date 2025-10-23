import React from 'react';

import { TUser } from '../types';

export type TProfileContext = {
  isAuth: boolean;
  authId: string | null;
  me: null | TUser;
};
export const ProfileContext = React.createContext<TProfileContext>({
  isAuth: false,
  authId: null,
  me: null,
});
