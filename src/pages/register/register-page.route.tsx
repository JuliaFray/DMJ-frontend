import {createElement, lazy} from "react";
import {RouteObject} from "react-router-dom";
import {pathKeys} from "shared/lib/react-router";

const RegisterPage = lazy(() =>
    import ('./register-page.ui').then((module) => ({default: module.RegisterPage}))
)

export const registerPageRoute: RouteObject = {
    path: pathKeys.register(),
    element: createElement(RegisterPage)
}
