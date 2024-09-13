import React from "react";
import {ProfileContext} from "app/providers/RouterProvider";
import {GuestLayout} from "shared/ui/layouts/guest.layout";
import {UserLayout} from "./user.layout";

export const GenericLayout = () => {
    return <ProfileContext.Consumer>
        {(context) =>
            context.isAuth ? <UserLayout/> : <GuestLayout/>}
    </ProfileContext.Consumer>
}
