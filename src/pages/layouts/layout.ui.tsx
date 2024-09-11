import React from "react"
import Login from "@mui/icons-material/Login";
import {Typography} from "@mui/material";
import {useSelector} from "react-redux";
import {NavLink} from "react-router-dom";
import {pathKeys} from "shared/lib/react-router";
import {getMyProfile} from "../../redux/profile/profile-selectors";
import styles from './layout.module.scss';

export const Footer = () => {
    return (
        <footer>
            <div className="container">
                <NavLink
                    className="logo-font"
                    to={pathKeys.home()}
                >
                    DMJ
                </NavLink>
            </div>
        </footer>
    )
}

export function BrandLink() {
    return (
        <NavLink
            className={styles.header}
            to={pathKeys.home()}
        >
            <Typography variant='h6' component='div' sx={{flexGrow: 1}}>
                DMJ
            </Typography>

        </NavLink>
    )
}

export function HomeLink() {
    return (
        <NavLink
            className="nav-link"
            to={pathKeys.home()}
        >
            Home
        </NavLink>
    )
}

export function SignInLink() {
    return (
        <NavLink
            className="nav-link"
            to={pathKeys.login()}
        >
            <Login/>
        </NavLink>
    )
}

export function SignUpLink() {
    return (
        <NavLink
            className="nav-link"
            to={pathKeys.register()}
        >
            Sign up
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

export function SettingsProfileLink() {
    return (
        <NavLink
            className="nav-link"
            to={pathKeys.settings()}
        >
            {/*<IoSettingsSharp size={16} />*/}
            &nbsp;Settings
        </NavLink>
    )
}

export function ProfileLink() {
    const profile = useSelector(getMyProfile);

    return (
        profile ? <NavLink
            className="nav-link"
            to={pathKeys.profile.byUsername({username: profile.username})}
        >
            <img
                className="user-pic"
                src={profile.image}
                alt={profile.username}
            />
            {profile.username}
        </NavLink> : null
    )
}
