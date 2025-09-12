import { createElement, lazy } from 'react';

import { RouteObject } from 'react-router-dom';

import { compose, pathKeys, withSuspense } from 'shared/lib';

import { HomePageSkeleton } from './home-page.skeleton';

const HomePage = lazy(() =>
  import('./home-page.ui').then((module) => ({ default: module.GenericHomePage })),
);

const enhance = compose((component) =>
  withSuspense(component, { FallbackComponent: HomePageSkeleton }),
);

export const homePageRoute: RouteObject = {
  path: pathKeys.home(),
  element: createElement(enhance(HomePage)),
};
