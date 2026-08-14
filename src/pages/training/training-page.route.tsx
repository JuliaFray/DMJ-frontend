import { createElement, lazy } from 'react';

import { RouteObject } from 'react-router-dom';

import { compose, pathKeys, withSuspense } from 'shared/lib';

import { DietPlanFeedPageSkeleton } from '../diet-plan-feed/diet-plan-feed-page.skeleton';

const TrainingPage = lazy(() =>
  import('./training-page.ui').then((module) => ({ default: module.TrainingPage })),
);

const enhance = compose((component) =>
  withSuspense(component, { FallbackComponent: DietPlanFeedPageSkeleton }),
);

export const trainingPageRoute: RouteObject = {
  path: pathKeys.training.root(),
  element: createElement(enhance(TrainingPage)),
};
