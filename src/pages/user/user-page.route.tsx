import { createElement, lazy } from 'react';

import { RouteObject } from 'react-router-dom';

import { compose, pathKeys, withSuspense } from 'shared/lib';

import { UserPageSkeleton } from './user-page.skeleton';

const UserPage = lazy(() =>
  import('./user-page.ui').then((module) => ({ default: module.UserPage })),
);

const enhance = compose((component) =>
  withSuspense(component, { FallbackComponent: UserPageSkeleton }),
);

export const userPageRoute: RouteObject = {
  path: pathKeys.user.root(),
  element: createElement(enhance(UserPage)),
  children: [
    {
      path: ':id',
      element: createElement(enhance(UserPage)),
    },
  ],
};
