import {createElement, lazy} from "react";
import {RouteObject} from "react-router-dom";
import {compose, withSuspense} from "shared/lib/react";
import {pathKeys} from "shared/lib/react-router";
import {ProfilePageSkeleton} from "./profile-page.skeleton";

const UsersPage = lazy(() =>
    import ('./users-page.ui').then((module) => ({default: module.GenericUsersPage})));


const enhance = compose(
    (component) =>
        withSuspense(
            component, {FallbackComponent: ProfilePageSkeleton}
        )
);

// const enhance = compose(
//     (component) =>
//         withSuspense(
//             withAuthRedirect(component), {FallbackComponent: ProfilePageSkeleton}
//         )
// );

export const usersPageRoute: RouteObject = {
    path: pathKeys.users.root(),
    element: createElement(enhance(UsersPage)),
    // children: [
    //     {
    //         path: ':id',
    //         element: createElement(enhance(UsersPage))
    //     }
    // ]
}
