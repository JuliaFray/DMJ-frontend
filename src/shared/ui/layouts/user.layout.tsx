import React from "react"
import {AppBar, Box, Container, Toolbar} from "@mui/material";
import {useSelector} from "react-redux";
import {Outlet} from "react-router-dom";
import {getAuthId} from "shared/model/auth/auth-selectors";
import {BrandLink} from "shared/ui/layouts/layout.ui";
import HeaderMenu from "../../../Components/Header/HeaderMenu";
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
            <Container fixed className={styles.main} maxWidth={'xl'}>
                <Outlet/>
            </Container>
        </>
    )
}



