import { createElement, lazy } from 'react';

import { RouteObject } from 'react-router-dom';

import { pathKeys } from 'shared/lib';

const ConfirmationPage = lazy(() =>
  import('./confirmation-page.ui').then((module) => ({ default: module.ConfirmationPage })),
);

export const confirmationPageRoute: RouteObject = {
  path: pathKeys.confirm.root(),
  element: createElement(ConfirmationPage),
  children: [
    {
      path: ':email/:token',
      element: createElement(ConfirmationPage),
    },
  ],
};
