import {createElement, lazy} from "react";
import {RouteObject} from "react-router-dom";
import {compose, withSuspense} from "shared/lib/react";
import {ArticlePageSkeleton} from "./article-page.skeleton";

const ArticlePage = lazy(() =>
    import('./article-page.ui').then((module) => ({default: module.ArticlePage})),
)

const enhance = compose((component) =>
    withSuspense(component, {FallbackComponent: ArticlePageSkeleton}),
)

export const articlePageRoute: RouteObject = {
    path: 'article/',
    children: [
        {
            path: ':id',
            element: createElement(enhance(ArticlePage))
        }
    ]
}
