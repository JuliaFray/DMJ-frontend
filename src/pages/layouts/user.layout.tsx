import React from "react"
import {AppBar, Box, Toolbar} from "@mui/material";
import {BrandLink} from "pages/layouts/layout.ui";
import {useSelector} from "react-redux";
import {Outlet} from "react-router-dom";
import HeaderMenu from "../../Components/Header/HeaderMenu";
import {getAuthId} from "../../redux/auth/auth-selectors";
import styles from "./layout.module.scss";

export const UserLayout = () => {
    const userId = useSelector(getAuthId);
    return (
        <>
            <Box sx={{flexGrow: 1}} className={styles.header}>
                <AppBar position='static'>
                    <Toolbar className={styles.toolbar}>
                        <BrandLink/>
                        <HeaderMenu userId={userId}/>
                    </Toolbar>
                </AppBar>
            </Box>
            <Outlet/>
        </>
    )
}



