import React from "react"
import {Logout} from "@mui/icons-material";
import Login from "@mui/icons-material/Login";
import {Tooltip, Typography} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {useDispatch, useSelector} from "react-redux";
import {NavLink} from "react-router-dom";
import {pathKeys} from "shared/lib/react-router";
import {appActions} from "shared/model/app/app-slice";
import {authActions} from "shared/model/auth/auth-slice";
import styles from './layout.module.scss';
import {getAuthId} from "shared/model/auth/auth-selectors";
import {SocketEvents} from "shared/lib/DictConstants";
import useWebSocket from "shared/hook/hooks";

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
    const dispatch = useDispatch();
    const authId = useSelector(getAuthId);

    const ws = useWebSocket();

    const handleLogout = () => {
        ws?.send(JSON.stringify({type: SocketEvents.LOGOUT_EVENT, id: authId}));
        dispatch(authActions.logout());
        dispatch(appActions.setUninitialized());
    }

    return (
        <Tooltip title="Выйти">
            <IconButton onClick={handleLogout}>
                <Logout color='success'/>
            </IconButton>
        </Tooltip>
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

