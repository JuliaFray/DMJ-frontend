import { createElement, lazy } from 'react';

import { RouteObject } from 'react-router-dom';

import { compose, withSuspense } from 'shared/lib';

import { ArticlePageSkeleton } from '../article';

const DietPage = lazy(() =>
  import('./diet-plan-page.ui').then((module) => ({ default: module.DietPlanPage })),
);

const enhance = compose((component) =>
  withSuspense(component, { FallbackComponent: ArticlePageSkeleton }),
);

export const dietPlanPageRoute: RouteObject = {
  path: 'planner/',
  children: [
    {
      path: ':id',
      element: createElement(enhance(DietPage)),
    },
  ],
};
