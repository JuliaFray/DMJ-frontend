import { createElement, lazy } from 'react';

import { RouteObject } from 'react-router-dom';

import { compose, pathKeys, withSuspense } from 'shared/lib';

import { DietPlanFeedPageSkeleton } from '../diet-plan-feed/diet-plan-feed-page.skeleton';

const DietDiaryPage = lazy(() =>
  import('./diet-diary-page.ui').then((module) => ({ default: module.DietDiaryPage })),
);

const enhance = compose((component) =>
  withSuspense(component, { FallbackComponent: DietPlanFeedPageSkeleton }),
);

export const dietDiaryPageRoute: RouteObject = {
  path: pathKeys.diary.root(),
  element: createElement(enhance(DietDiaryPage)),
};
