import React from "react";
import {useSelector} from "react-redux";
import {getIsAuth} from "../../redux/auth/auth-selectors";
import {GuestLayout} from "./guest.layout";
import {UserLayout} from "./user.layout";

export const GenericLayout = () => {
    const isAuth = useSelector(getIsAuth);

    return isAuth ? <UserLayout/> : <GuestLayout/>
}
