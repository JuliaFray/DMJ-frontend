import { createElement, lazy } from 'react';

import { RouteObject } from 'react-router-dom';

import { compose, pathKeys, withSuspense } from 'shared/lib';

import { DietPageSkeleton } from './diet-page.skeleton';

const DietPage = lazy(() =>
  import('./diet-plan-page.ui').then((module) => ({ default: module.DietPlanPage })),
);

const enhance = compose((component) =>
  withSuspense(component, { FallbackComponent: DietPageSkeleton }),
);

export const dietPlanPageRoute: RouteObject = {
  path: pathKeys.planner.root(),
  children: [
    {
      path: ':id',
      element: createElement(enhance(DietPage)),
    },
  ],
};
