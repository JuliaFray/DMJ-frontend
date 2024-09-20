import {createElement, lazy} from "react";
import {RouteObject} from "react-router-dom";
import {compose, withSuspense} from "shared/lib/react";
import {pathKeys} from "shared/lib/react-router";
import {DietPageSkeleton} from "./diet-page.skeleton";

const DietPage = lazy(() =>
    import('./diet-page.ui').then((module) => ({default: module.GenericHomePage})),
)

const enhance = compose((component) =>
    withSuspense(component, {FallbackComponent: DietPageSkeleton}),
)

export const dietPageRoute: RouteObject = {
    path: pathKeys.diet.root(),
    element: createElement(enhance(DietPage)),
}
