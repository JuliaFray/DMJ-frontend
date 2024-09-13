import React, {ReactNode} from "react"
import Login from "@mui/icons-material/Login";
import {Grid, Tooltip, Typography, useMediaQuery} from "@mui/material";
import {useSelector} from "react-redux";
import {NavLink} from "react-router-dom";
import {pathKeys} from "shared/lib/react-router";
import {getMyProfile} from "shared/model/profile/profile-selectors";
import {theme} from "shared/themes/theme";
import ScrollToTop from "shared/ui/ScrollToTop";
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
        <NavLink to={pathKeys.login()}>
            <Tooltip title="Войти">
                <Login/>
            </Tooltip>
        </NavLink>
    )
}

export function SignUpLink() {
    return (
        <NavLink to={pathKeys.register()}>
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
type TPageLayout = {
    isMainPage: boolean,
    mainChildren: ReactNode,
    leftChildren?: ReactNode,
    rightChildren?: ReactNode,
    mainSx?: Record<string, any>
}

export const CommonLayoutUi: React.FC<TPageLayout> = (props, context) => {
    const isMore1200px = useMediaQuery(theme.breakpoints.up('lg'));

    const mdMain = props.isMainPage
        ? isMore1200px
            ? 7
            : props.rightChildren ? 8.5 : 12
        : 12

    const mdSide = isMore1200px
        ? 2.5
        : 3.5;

    return (
        <div className={styles.main}>

            <Grid container spacing={2} sx={{height: '100%'}}>
                {isMore1200px && props.isMainPage && <Grid item md={2.5} className={styles.left}>{props.leftChildren}</Grid>}

                <Grid item xs={12} sm={12} md={mdMain} sx={props.mainSx ? props.mainSx : {height: 'auto'}}>
                    {props.mainChildren}
                </Grid>

                {props.rightChildren && props.isMainPage && <Grid item md={mdSide} className={styles.right}>{props.rightChildren}</Grid>}

            </Grid>
            <ScrollToTop/>
        </div>

    );
}
