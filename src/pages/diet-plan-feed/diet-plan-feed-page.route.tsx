import { createElement, lazy } from 'react';

import { RouteObject } from 'react-router-dom';

import { compose, pathKeys, withSuspense } from 'shared/lib';

import { DietPlanFeedPageSkeleton } from './diet-plan-feed-page.skeleton';

const DietPage = lazy(() =>
  import('./diet-plan-feed-page.ui').then((module) => ({
    default: module.GenericDietPage,
  })),
);

const enhance = compose((component) =>
  withSuspense(component, { FallbackComponent: DietPlanFeedPageSkeleton }),
);

export const dietPlanFeedPageRoute: RouteObject = {
  path: pathKeys.planner.root(),
  element: createElement(enhance(DietPage)),
};
