import { createElement, lazy } from 'react';

import { RouteObject } from 'react-router-dom';

import { compose, pathKeys, withAuthRedirect, withSuspense } from 'shared/lib';

import { DietPlanEditorPageSkeleton } from './diet-plan-editor-page.skeleton';

const DietPlanEditorPage = lazy(() =>
  import('./diet-plan-editor-page.ui').then((module) => ({ default: module.DietPlanEditorPage })),
);

const enhance = compose((component) =>
  withSuspense(withAuthRedirect(component), { FallbackComponent: DietPlanEditorPageSkeleton }),
);

export const dietEditorPageRoute: RouteObject = {
  path: pathKeys.planner.editor.root(),
  element: createElement(enhance(DietPlanEditorPage)),
  children: [
    {
      path: ':id',
      element: createElement(enhance(DietPlanEditorPage)),
    },
  ],
};
