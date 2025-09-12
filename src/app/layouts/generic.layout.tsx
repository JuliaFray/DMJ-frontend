import React from 'react';

import { ProfileContext } from '../providers/RouterProvider';

import { UserLayout } from './user.layout';

export function GenericLayout() {
  return <ProfileContext.Consumer>{() => <UserLayout />}</ProfileContext.Consumer>;
}
