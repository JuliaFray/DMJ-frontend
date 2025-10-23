import { createElement, lazy } from 'react';

import { RouteObject } from 'react-router-dom';

import { compose, pathKeys, withAuthRedirect, withSuspense } from 'shared/lib';

import { UserPageSkeleton } from './user-page.skeleton';

const ProfilePage = lazy(() =>
  import('./user-page.ui').then((module) => ({ default: module.ProfilePage })),
);

const enhance = compose((component) =>
  withSuspense(withAuthRedirect(component), { FallbackComponent: UserPageSkeleton }),
);

export const userPageRoute: RouteObject = {
  path: pathKeys.user.root(),
  element: createElement(enhance(ProfilePage)),
  children: [
    {
      path: ':id',
      element: createElement(enhance(ProfilePage)),
    },
  ],
};
