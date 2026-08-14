import { createElement, lazy } from 'react';

import { RouteObject } from 'react-router-dom';

import { compose, pathKeys, withSuspense } from 'shared/lib';

import { DietPlanFeedPageSkeleton } from '../diet-plan-feed/diet-plan-feed-page.skeleton';

const SettingsPage = lazy(() =>
  import('./settings-page.ui').then((module) => ({ default: module.SettingsPage })),
);

const enhance = compose((component) =>
  withSuspense(component, { FallbackComponent: DietPlanFeedPageSkeleton }),
);

export const settingsPageRoute: RouteObject = {
  path: pathKeys.settings(),
  element: createElement(enhance(SettingsPage)),
};
