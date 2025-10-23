import { createElement, lazy } from 'react';

import { RouteObject } from 'react-router-dom';

import { compose, pathKeys, withSuspense } from 'shared/lib';

import { ArticleFeedPageSkeleton } from './article-feed-page.skeleton';

const HomePage = lazy(() =>
  import('./article-feed-page.ui').then((module) => ({ default: module.GenericHomePage })),
);

const enhance = compose((component) =>
  withSuspense(component, { FallbackComponent: ArticleFeedPageSkeleton }),
);

export const articleFeedPageRoute: RouteObject = {
  path: pathKeys.article.root(),
  element: createElement(enhance(HomePage)),
};
