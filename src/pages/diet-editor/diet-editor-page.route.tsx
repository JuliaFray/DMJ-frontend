import { createElement, lazy } from 'react';

import { RouteObject } from 'react-router-dom';

import { compose, pathKeys, withAuthRedirect, withSuspense } from 'shared/lib';

import { DietEditorPageSkeleton } from './diet-editor-page.skeleton';

const ArticleEditorPage = lazy(() =>
  import('./diet-editor-page.ui').then((module) => ({ default: module.ArticleEditorPage })),
);

const enhance = compose((component) =>
  withSuspense(withAuthRedirect(component), { FallbackComponent: DietEditorPageSkeleton }),
);

export const dietEditorPageRoute: RouteObject = {
  path: pathKeys.planner.editor.root(),
  element: createElement(enhance(ArticleEditorPage)),
  children: [
    {
      path: ':id',
      element: createElement(enhance(ArticleEditorPage)),
    },
  ],
};
