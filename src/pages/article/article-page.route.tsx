import { createElement, lazy } from 'react';

import { RouteObject } from 'react-router-dom';

import { compose, pathKeys, withSuspense } from 'shared/lib';

import { ArticlePageSkeleton } from './article-page.skeleton';

const ArticlePage = lazy(() =>
  import('./article-page.ui').then((module) => ({
    default: module.ArticlePage,
  })),
);

const enhance = compose((component) =>
  withSuspense(component, { FallbackComponent: ArticlePageSkeleton }),
);

export const articlePageRoute: RouteObject = {
  path: pathKeys.article.root(),
  children: [
    {
      path: ':id',
      element: createElement(enhance(ArticlePage)),
    },
  ],
};
