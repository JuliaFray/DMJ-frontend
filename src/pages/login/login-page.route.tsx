import {createElement, lazy} from "react";
import {RouteObject} from "react-router-dom";
import {pathKeys} from "shared/lib/react-router";

const LoginPage = lazy(() =>
    import ('./login-page.ui').then((module) => ({default: module.LoginPage}))
)

export const loginPageRoute: RouteObject = {
    path: pathKeys.login(),
    element: createElement(LoginPage)
}
