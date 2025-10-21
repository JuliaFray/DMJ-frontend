import { createElement, lazy } from 'react';

import { RouteObject } from 'react-router-dom';

import { compose, pathKeys, withSuspense } from 'shared/lib';

import { DietPageSkeleton } from '../diet-feed/diet-page.skeleton';

const MeasurePage = lazy(() =>
  import('./measure-page.ui').then((module) => ({ default: module.MeasurePage })),
);

const enhance = compose((component) =>
  withSuspense(component, { FallbackComponent: DietPageSkeleton }),
);

export const measurePageRoute: RouteObject = {
  path: pathKeys.measure.root(),
  element: createElement(enhance(MeasurePage)),
};
