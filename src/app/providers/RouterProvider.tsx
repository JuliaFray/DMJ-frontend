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
import { homePageRoute } from 'pages/article-feed';
import { dialogPageRoute } from 'pages/dialogs';
import { dietPlanPageRoute } from 'pages/diet';
import { dietDiaryPageRoute } from 'pages/diet-diary';
import { dietPageRoute } from 'pages/diet-feed';
import { loginPageRoute } from 'pages/login';
import { measurePageRoute } from 'pages/measure';
import { page404Router } from 'pages/page-404';
import { profilePageRoute } from 'pages/profile';
import { registerPageRoute } from 'pages/register';
import { usersPageRoute } from 'pages/users';

import { useAppSelector } from 'shared/hook';
import { pathKeys, withSuspense } from 'shared/lib';
import { getIsAuth, getMyProfile } from 'shared/model';
import { TUser } from 'shared/types';
import { Spinner } from 'shared/ui';

const GenericLayout = lazy(() =>
  import('../layouts').then((module) => ({
    default: module.GenericLayout,
  })),
);

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

  if (error) throw error;
  return null;
}

function LayoutSkeleton() {
  return <Spinner display position='center' />;
}

const enhance = compose((component: React.ComponentType<object>) =>
  withSuspense(component, { FallbackComponent: LayoutSkeleton }),
);
type TProfileContext = {
  isAuth: boolean;
  me: null | TUser;
};
export const ProfileContext = React.createContext<TProfileContext>({
  isAuth: false,
  me: null,
});

const browserRouter = createBrowserRouter([
  {
    errorElement: <BubbleError />,
    children: [
      {
        element: createElement(enhance(GenericLayout)),
        children: [homePageRoute, articlePageRoute, profilePageRoute, usersPageRoute],
      },
      {
        element: createElement(enhance(UserLayout)),
        children: [
          dialogPageRoute,
          articleEditorPageRoute,
          dietPageRoute,
          dietPlanPageRoute,
          dietDiaryPageRoute,
          measurePageRoute,
        ],
      },
      {
        element: createElement(enhance(GuestLayout)),
        children: [loginPageRoute, registerPageRoute],
      },
      {
        element: createElement(Outlet),
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
  const isAuth = useAppSelector(getIsAuth);
  const me = useAppSelector(getMyProfile);

  return useMemo(() => {
    return (
      <ProfileContext.Provider value={{ isAuth, me }}>
        <RouterProvider router={browserRouter} />
      </ProfileContext.Provider>
    );
  }, [isAuth, me]);
};
