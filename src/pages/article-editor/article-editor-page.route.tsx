import { createElement, lazy } from 'react';

import { RouteObject } from 'react-router-dom';

import { compose, pathKeys, withAuthRedirect, withSuspense } from 'shared/lib';

import { ArticleEditorPageSkeleton } from './article-editor-page.skeleton';

const ArticleEditorPage = lazy(() =>
  import('./article-editor-page.ui').then((module) => ({ default: module.ArticleEditorPage })),
);

const enhance = compose((component) =>
  withSuspense(withAuthRedirect(component), { FallbackComponent: ArticleEditorPageSkeleton }),
);

export const articleEditorPageRoute: RouteObject = {
  path: pathKeys.article.editor.root(),
  element: createElement(enhance(ArticleEditorPage)),
  children: [
    {
      path: ':id',
      element: createElement(enhance(ArticleEditorPage)),
    },
  ],
};
