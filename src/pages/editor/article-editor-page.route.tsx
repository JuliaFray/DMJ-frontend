import React, {createElement, lazy} from "react";
import {RouteObject} from "react-router-dom";
import {compose, withAuthRedirect, withSuspense} from "shared/lib/react";
import {pathKeys} from "shared/lib/react-router";
import {ArticleEditorPageSkeleton} from "./article-editor-page.skeleton";

const ArticleEditorPage = lazy(() =>
    import('./article-editor-page.ui').then((module) => ({default: module.ArticleEditorPage})),
)

const enhance = compose((component) =>
    withSuspense(withAuthRedirect(component), {FallbackComponent: ArticleEditorPageSkeleton}),
)

export const articleEditorPageRoute: RouteObject = {
    path: pathKeys.editor.root(),
    element: createElement(enhance(ArticleEditorPage)),
    children: [
        {
            path: ':id',
            element: createElement(enhance(ArticleEditorPage)),
        }
    ]
}
