import {createElement, lazy} from "react";
import {RouteObject} from "react-router-dom";
import {compose, withAuthRedirect, withSuspense} from "shared/lib/react";
import {pathKeys} from "shared/lib/react-router";
import {ProfilePageSkeleton} from "./profile-page.skeleton";

const ProfilePage = lazy(() =>
    import ('./profile-page.ui').then((module) => ({default: module.ProfilePage})));


const enhance = compose(
    (component) =>
        withSuspense(
            withAuthRedirect(component), {FallbackComponent: ProfilePageSkeleton}
        )
);

export const profilePageRoute: RouteObject = {
    path: pathKeys.profile.root(),
    element: createElement(enhance(ProfilePage)),
    children: [
        {
            path: ':id',
            element: createElement(enhance(ProfilePage))
        }
    ]
}
