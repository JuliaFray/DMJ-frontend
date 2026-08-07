import React, { createElement, lazy } from 'react';

import { RouteObject } from 'react-router-dom';

import { compose, pathKeys, withSuspense } from 'shared/lib';
import { Spinner } from 'shared/ui';

const Page404 = lazy(() =>
  import('./page-404.ui').then((module) => ({
    default: module.Page404,
  })),
);

const enhance = compose((component: any) =>
  withSuspense(component, {
    fallback: <Spinner display />,
  }),
);

export const page404Router: RouteObject = {
  path: pathKeys.page404(),
  element: createElement(enhance(Page404)),
};
