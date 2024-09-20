import {createElement, lazy} from "react";
import {RouteObject} from "react-router-dom";
import {compose, withAuthRedirect, withSuspense} from "shared/lib/react";
import {pathKeys} from "shared/lib/react-router";
import {HomePageSkeleton} from "./dialog-page.skeleton";

const DialogPage = lazy(() =>
    import('./dialog-page.ui').then((module) => ({default: module.DialogPage})),
)

const enhance = compose((component) =>
    withSuspense(withAuthRedirect(component), {FallbackComponent: HomePageSkeleton}),
)

export const dialogPageRoute: RouteObject = {
    path: pathKeys.dialogs(),
    element: createElement(enhance(DialogPage)),
    children: [
        {
            path: ':id',
            element: createElement(enhance(DialogPage))
        }
    ]
}
