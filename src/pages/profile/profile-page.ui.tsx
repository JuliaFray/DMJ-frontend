import React, {useEffect} from "react";

import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {ProfileCard} from "widgets";

import {Grid, useMediaQuery} from "@mui/material";

import {getAuthId} from "shared/model/auth/auth-selectors";
import {getProfile} from "shared/model/profile/profile-selectors";
import {getUserProfile, getUserProfileStats,} from "shared/model/profile/profile-thunks";
import {theme} from "shared/themes/theme";

import {ProfileTabs} from "widgets/profile/ProfileTabs";

import styles from "./profile-page.module.scss";

export const ProfilePage: React.FC = React.memo(() => {
    const isMore1200px = useMediaQuery(theme.breakpoints.up("lg"));

    const profile = useSelector(getProfile);
    const authorizeUserId = useSelector(getAuthId);

    const params = useParams();
    const dispatch = useDispatch();

    const isOwner = params.id === authorizeUserId;
    let userId: string = params.id || authorizeUserId || profile?.userId || "";

    useEffect(() => {
        dispatch(getUserProfile({userId}));
        dispatch(getUserProfileStats({userId}));
    }, [userId]);

    return (
        <Grid container spacing={2} width={"100%"}>
            <Grid item md={isMore1200px ? 9 : 12} width={"100%"}>
                {!!profile && <ProfileCard isOwner={isOwner} profile={profile}/>}
                {!!profile && <ProfileTabs isOwner={isOwner} userId={profile._id}/>}
            </Grid>

            <Grid item md={3} className={styles.right}></Grid>
        </Grid>
    );
});
