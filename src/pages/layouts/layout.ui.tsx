import React from "react"
import {Logout} from "@mui/icons-material";
import Login from "@mui/icons-material/Login";
import {Tooltip, Typography} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {NavLink} from "react-router-dom";
import {pathKeys} from "shared/lib/react-router";
import styles from './layout.module.scss';

export function BrandLink() {
    return (
        <NavLink
            className={styles.header}
            to={pathKeys.home()}
        >
            <Typography variant='h6' component='div' sx={{flexGrow: 1}}>
                <IconButton>
                    <img alt={'logo'}
                         style={{height: '40px'}}
                         src={window.location.origin + '/logo.png'}/>
                </IconButton>
            </Typography>

        </NavLink>
    )
}

export function SignInLink() {
    return (
        <NavLink to={pathKeys.login()}>
            <Tooltip title="Войти">
                <Login/>
            </Tooltip>
        </NavLink>
    )
}

export function SignOutLink() {
    return (
        <NavLink to={pathKeys.login()}>
            <Tooltip title="Выйти">
                <Logout/>
            </Tooltip>
        </NavLink>
    )
}


export function NewArticleLink() {
    return (
        <NavLink
            className="nav-link"
            to={pathKeys.editor.root()}
        >
            {/*<IoCreateOutline size={16} />*/}
            &nbsp;New Article
        </NavLink>
    )
}

