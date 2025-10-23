import { createElement, lazy } from 'react';

import { RouteObject } from 'react-router-dom';

import { compose, pathKeys, withSuspense } from 'shared/lib';

import { UserFeedPageSkeleton } from './user-feed-page.skeleton';

const UsersPage = lazy(() =>
  import('./user-feed-page.ui').then((module) => ({ default: module.GenericUsersPage })),
);

const enhance = compose((component) =>
  withSuspense(component, { FallbackComponent: UserFeedPageSkeleton }),
);

// const enhance = compose(
//     (component) =>
//         withSuspense(
//             withAuthRedirect(component), {FallbackComponent: UserFeedPageSkeleton}
//         )
// );

export const usersPageRoute: RouteObject = {
  path: pathKeys.user.root(),
  element: createElement(enhance(UsersPage)),
  // children: [
  //     {
  //         path: ':id',
  //         element: createElement(enhance(UsersPage))
  //     }
  // ]
};
