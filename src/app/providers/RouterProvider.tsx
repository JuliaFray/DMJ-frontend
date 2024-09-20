import React, {createElement, lazy} from "react";
import {Stack} from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import {TProfile} from "entities/profile";
import {articlePageRoute} from "pages/article";
import {dialogPageRoute} from "pages/dialogs/dialog-page.route";
import {homePageRoute} from "pages/home";
import {loginPageRoute} from "pages/login";
import {page404Router} from 'pages/page-404';
import {profilePageRoute} from "pages/profile";
import {registerPageRoute} from "pages/register";
import {usersPageRoute} from "pages/users/user-page.route";
import {useSelector} from "react-redux";
import {createBrowserRouter, NavLink, Outlet, redirect, RouterProvider, useRouteError} from "react-router-dom";
import {compose} from "redux";
import {withSuspense} from "shared/lib/react/react.hoc";
import {pathKeys} from "shared/lib/react-router";
import {getIsAuth} from "shared/model/auth/auth-selectors";
import {getMyProfile} from "shared/model/profile/profile-selectors";
import {Spinner} from "shared/ui/spinner";

const GenericLayout = lazy(() =>
    import('pages/layouts').then((module) => ({
        default: module.GenericLayout,
    })),
)

const GuestLayout = lazy(() =>
    import('pages/layouts').then((module) => ({
        default: module.GuestLayout,
    })),
)

const UserLayout = lazy(() =>
    import('pages/layouts').then((module) => ({
        default: module.UserLayout,
    })),
)


const enhance = compose((component: React.ComponentType<object>) =>
    withSuspense(component, {FallbackComponent: LayoutSkeleton}),
)
type TProfileContext = {
    isAuth: boolean,
    me: null | TProfile
}
export const ProfileContext = React.createContext<TProfileContext>({isAuth: false, me: null});

export const BrowserRouting = () => {
    const isAuth = useSelector(getIsAuth);
    const me = useSelector(getMyProfile);

    return <ProfileContext.Provider value={{isAuth: isAuth, me: me}}>
        <RouterProvider router={browserRouter}/>
    </ProfileContext.Provider>
}

const browserRouter = createBrowserRouter([
    {
        errorElement: <BubbleError/>,
        children: [
            {
                element: createElement(enhance(GenericLayout)),
                children: [homePageRoute, articlePageRoute, profilePageRoute, usersPageRoute],
            },
            {
                element: createElement(enhance(UserLayout)),
                children: [dialogPageRoute],
            },
            {
                element: createElement(enhance(GuestLayout)),
                children: [loginPageRoute, registerPageRoute],
            },
            {
                element: createElement(Outlet),
                children: [page404Router],
            },
            {
                loader: async () => redirect(pathKeys.page404()),
                path: '*',
            },
        ],
    },
])

function BubbleError() {
    const error = useRouteError()

    if(error) throw error
    return null
}

function LayoutSkeleton() {
    return (
        <>
            <nav>
                <div>
                    <Stack justifyContent="space-between">
                        <NavLink to={pathKeys.home()}>DMJ</NavLink>

                        <Stack
                            spacing={16}
                            alignItems="center"
                            justifyContent="flex-end"
                            style={{height: '38px'}}
                        >
                            <Skeleton width={40}/>
                            <Skeleton width={45}/>
                            <Skeleton width={50}/>
                        </Stack>
                    </Stack>
                </div>
            </nav>

            <Spinner display position="center"/>
        </>
    )
}
