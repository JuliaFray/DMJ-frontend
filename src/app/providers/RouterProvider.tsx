import React, { createElement, lazy } from 'react';

import {
  createBrowserRouter,
  Navigate,
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
import { settingsPageRoute } from 'pages/settings';
import { trainingPageRoute } from 'pages/training';
import { userPageRoute } from 'pages/user';
import { usersPageRoute } from 'pages/user-feed';

import { AuthProvider, useAuth } from 'shared/context';
import { pathKeys, withSuspense } from 'shared/lib';
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

const GlobalAuthGuard = () => {
  const { isAuth, isLoading } = useAuth();

  if (isLoading) {
    return <Spinner display />; // Show a loader while checking auth token
  }

  return isAuth ? <Outlet /> : <Navigate to={pathKeys.login()} replace />;
};

const browserRouter = createBrowserRouter([
  {
    errorElement: <BubbleError />,
    children: [
      {
        element: <GlobalAuthGuard />,
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
              trainingPageRoute,
              settingsPageRoute,
            ],
          },
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
  return <RouterProvider router={browserRouter} />;
};
