import React, { createElement, lazy, useMemo } from 'react';

import {
  createBrowserRouter,
  Outlet,
  redirect,
  RouterProvider,
  useRouteError,
} from 'react-router-dom';
import { compose } from 'redux';

import { articlePageRoute } from 'pages/article';
import { articleEditorPageRoute } from 'pages/article-editor';
import { articleFeedPageRoute } from 'pages/article-feed';
import { confirmationPageRoute } from 'pages/confirmation';
import { dialogPageRoute } from 'pages/dialogs';
import { dietDiaryPageRoute } from 'pages/diet-diary';
import { dietPlanPageRoute } from 'pages/diet-plan';
import { dietPlanFeedPageRoute } from 'pages/diet-plan-feed';
import { loginPageRoute } from 'pages/login';
import { measurePageRoute } from 'pages/measure';
import { page404Router } from 'pages/page-404';
import { registerPageRoute } from 'pages/register';
import { userPageRoute } from 'pages/user';
import { usersPageRoute } from 'pages/user-feed';

import { ProfileContext } from 'shared/context';
import { useAppSelector } from 'shared/hook';
import { pathKeys, withSuspense } from 'shared/lib';
import { authSelector, profileSelector } from 'shared/model';
import { Spinner } from 'shared/ui';

const GuestLayout = lazy(() =>
  import('../layouts').then((module) => ({
    default: module.GuestLayout,
  })),
);

const UserLayout = lazy(() =>
  import('../layouts').then((module) => ({
    default: module.UserLayout,
  })),
);

function BubbleError() {
  const error = useRouteError();

  if (error) {
    console.error(error);
  }
  return null;
}

function LayoutSkeleton() {
  return <Spinner display />;
}

const enhance = compose((component: React.ComponentType<object>) =>
  withSuspense(component, { FallbackComponent: LayoutSkeleton }),
);

const browserRouter = createBrowserRouter([
  {
    errorElement: <BubbleError />,
    children: [
      {
        element: createElement(enhance(UserLayout)),
        children: [
          dialogPageRoute,
          articleEditorPageRoute,
          dietPlanFeedPageRoute,
          dietPlanPageRoute,
          dietDiaryPageRoute,
          measurePageRoute,
          articleFeedPageRoute,
          articlePageRoute,
          userPageRoute,
          usersPageRoute,
        ],
      },
      {
        element: createElement(enhance(GuestLayout)),
        children: [loginPageRoute, registerPageRoute, confirmationPageRoute],
      },
      {
        element: createElement(enhance(GuestLayout)),
        children: [page404Router],
      },
      {
        loader: async () => redirect(pathKeys.page404()),
        path: '*',
      },
    ],
  },
]);

export const BrowserRouting = () => {
  const isAuth = useAppSelector(authSelector.getIsAuth);
  const authId = useAppSelector(authSelector.getAuthId);
  const me = useAppSelector(profileSelector.getMyProfile);

  return useMemo(() => {
    return (
      <ProfileContext.Provider value={{ isAuth, authId, me }}>
        <RouterProvider router={browserRouter} />
      </ProfileContext.Provider>
    );
  }, [authId, isAuth, me]);
};
