import React, {createElement, lazy} from "react";
import {Stack} from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import {homePageRoute} from "pages/home";
import {loginPageRoute} from "pages/login/login-page.route";
import {page404Router} from 'pages/page-404';
import {createBrowserRouter, NavLink, Outlet, redirect, RouterProvider, useRouteError} from "react-router-dom";
import {compose} from "redux";
import {withSuspense} from "shared/lib/react/react.hoc";
import {pathKeys} from "shared/lib/react-router";
import {Spinner} from "shared/ui/spinner";
import {useAppDispatch} from "../../hook/hooks";
import {checkAuth} from "../../redux/auth/auth-thunks";

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

export const BrowserRouting = () => {
    const dispatch = useAppDispatch();

    if(window.localStorage.getItem("token")) {
        dispatch(checkAuth({}));
    }

    return <RouterProvider router={browserRouter}/>
}

const browserRouter = createBrowserRouter([
    {
        errorElement: <BubbleError/>,
        children: [
            {
                element: createElement(enhance(GenericLayout)),
                // children: [homePageRoute, articlePageRoute, profilePageRoute],
                children: [homePageRoute],
            },
            {
                element: createElement(enhance(UserLayout)),
                // children: [editorPageRoute, settingsPageRoute],
            },
            {
                element: createElement(enhance(GuestLayout)),
                // children: [loginPageRoute, registerPageRoute],
                children: [loginPageRoute],
            },
            {
                element: createElement(Outlet),
                children: [page404Router],
            },
            // {
            //     loader: async () => redirect(pathKeys.page404()),
            //     path: '*',
            // },
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
            <nav className="navbar navbar-light">
                <div className="container">
                    <Stack justifyContent="space-between">
                        <NavLink
                            className="navbar-brand"
                            to={pathKeys.home()}
                        >
                            DMJ
                        </NavLink>

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

            <Spinner
                display
                position="center"
            />
        </>
    )
}
