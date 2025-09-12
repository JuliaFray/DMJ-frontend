import { createElement, lazy } from 'react';

import { RouteObject } from 'react-router-dom';

import { compose, pathKeys, withSuspense } from 'shared/lib';

import { DietPageSkeleton } from './diet-page.skeleton';

const DietPage = lazy(() =>
  import('./diet-page.ui').then((module) => ({
    default: module.GenericDietPage,
  })),
);

const enhance = compose((component) =>
  withSuspense(component, { FallbackComponent: DietPageSkeleton }),
);

export const dietPageRoute: RouteObject = {
  path: pathKeys.diet.root(),
  element: createElement(enhance(DietPage)),
  children: [
    {
      path: ':id',
      element: createElement(enhance(DietPage)),
    },
  ],
};
