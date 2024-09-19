import React, {useCallback, useEffect, useState} from 'react';
import {Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Tooltip} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import {TProfile} from 'entities/profile';
import ProfileData from "entities/profile/ProfileData";
import styles from "entities/profile/ProfileInfo.module.scss";
import {useSelector} from "react-redux";
import useWebSocket, {useAppDispatch} from "shared/hook/hooks";
import {SocketEvents} from "shared/lib/DictConstants";
import {convertBase64ToBlob, getFullName} from "shared/lib/helper";
import {getUserOnline} from "shared/model/app/app-selectors";
import {appActions} from "shared/model/app/app-slice";
import {getAuthId} from "shared/model/auth/auth-selectors";
import {getIsFetching} from "shared/model/profile/profile-selectors";
import {saveUserProfile, toggleFollowProfile} from "shared/model/profile/profile-thunks";

type IProfileMain = {
    isOwner: boolean,
    profile: TProfile
}

const ProfileCard: React.FC<IProfileMain> = (props, context) => {

    const authId = useSelector(getAuthId);
    const [editMode, setEditMode] = useState(false);
    const [state, setState] = useState<TProfile>(props.profile);
    const [file, setFile] = useState<File | string | null>(props.profile?.avatar?.data);
    const [status, setStatus] = useState(false);
    const [isFollowed, setIsFollowed] = useState(props.profile.isFollowed);
    const [open, setOpen] = React.useState(false);

    const isFetching = useSelector(getIsFetching);
    const users = useSelector(getUserOnline);

    const ws = useWebSocket();
    const dispatch = useAppDispatch();

    const handleWS = useCallback(
        (e: any) => {
            const {type, data} = JSON.parse(e.data);
            if(type === SocketEvents.LOGOUT_EVENT) {
                setStatus(!data.includes(props.profile._id));
                dispatch(
                    appActions.setUsersOnline({type: 'app/setUserOnline', payload: props.profile._id})
                );
            }
        },
        [dispatch, props.profile._id]
    );

    useEffect(() => {
        if(!ws) return;

        ws.addEventListener("message", handleWS);
        return () => ws.removeEventListener("message", handleWS);
    }, [handleWS, ws]);

    const getKeyValue = <T, K extends keyof T>(obj: T, key: K): T[K] =>
        obj[key];

    const handleEdit = (isChanged: boolean) => {
        setEditMode((prevState) => !prevState);
        if(isChanged) {
            if(state && editMode) {
                const formData = new FormData();
                for(let key in state) {
                    const val = getKeyValue<TProfile, keyof TProfile>(state, key);
                    formData.append(
                        key,
                        typeof val === "string" ? val : JSON.stringify(val)
                    );
                }

                if(file) {
                    if(file instanceof File) {
                        formData.append("image", file);
                    } else {
                        formData.append("image", convertBase64ToBlob(file));
                    }
                }

                dispatch(saveUserProfile({profileId: state._id, file: formData}));
            }
        } else {
            setState(props.profile);
        }
    };

    const handleMessageClick = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleFollowClick = () => {
        setIsFollowed(!isFollowed);

        dispatch(
            toggleFollowProfile({
                    profileId: authId,
                    query: `?userId=${props.profile._id}&isFollow=${!isFollowed}`,
                    userId: props.profile._id
                }
            )
        );
    }

    const isOnline = status || users.includes(props.profile._id);

    if(!props.profile) {
        return <Stack spacing={4} height={'100%'}>
            <Skeleton variant="rounded" width={'100%'} height={'25%'}/>
            <Skeleton variant="rounded" width={'100%'} height={'40%'}/>
        </Stack>
    }

    const onSubmit = (event: React.FormEvent<HTMLFormElement>, user: TProfile) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries((formData as any).entries());

        const msg = {
            type: SocketEvents.MSG_EVENT,
            from: authId,
            to: user._id,
            text: formJson.text,
            dialogId: null
        };
        ws?.send(JSON.stringify({type: SocketEvents.MSG_EVENT, msg: msg}));

        handleClose();
    }

    const image = file
        ? typeof file === 'string'
            ? `data:image/jpeg;base64,${file}`
            : URL.createObjectURL(file)
        : '';

    return (
        <Card className={isOnline ? `${styles.profileCard} ${styles.on}` : `${styles.profileCard} ${styles.off}`}>
            <Container className={
                isOnline
                    ? `${styles.profileHeader} ${styles.on}`
                    : `${styles.profileHeader} ${styles.off}`
            }>
                <Avatar variant='circular'
                        className={styles.avatar}
                        src={image}
                        alt={props.profile.firstName}/>

                <div className={styles.actions}>
                    {!props.isOwner && !!authId &&
                        <>
                            {isFollowed
                                ? <Tooltip title={'Отписаться'}>
                                    <Button sx={{mr: 1}} className={styles.buttons} onClick={handleFollowClick} size='small' variant='contained'>
                                        <span>Отписаться</span>
                                    </Button>
                                </Tooltip>
                                : <Tooltip title={'Подписаться'}>
                                    <Button sx={{mr: 1}} className={styles.buttons} onClick={handleFollowClick} size='small' variant='outlined'>
                                        <span>Подписаться</span>
                                    </Button>
                                </Tooltip>}

                            <Tooltip title={'Написать'}>
                                <Button className={styles.buttons} onClick={handleMessageClick} size='small' variant='outlined'>
                                    <span>Написать</span>
                                </Button>
                            </Tooltip>

                            <Dialog
                                open={open}
                                fullWidth
                                onClose={handleClose}
                                PaperProps={{
                                    component: 'form',
                                    onSubmit: (event: React.FormEvent<HTMLFormElement>) => onSubmit(event, props.profile),
                                }}
                            >
                                <DialogTitle>Отправить сообщение</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>Кому: {getFullName(props.profile)}</DialogContentText>
                                    <TextField autoFocus required
                                               margin="dense" id="name" name="text"
                                               placeholder="Введите сообщение..." type="text"
                                               fullWidth variant="outlined"
                                    />
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose}>Отмена</Button>
                                    <Button variant='contained' type="submit">Отправить</Button>
                                </DialogActions>
                            </Dialog>
                        </>
                    }
                </div>
            </Container>

            <Container className={styles.profileInfo}>
                <ProfileData
                    profile={state}
                    isOwner={props.isOwner}
                    editMode={editMode}
                    state={state}
                    setState={setState}
                />
            </Container>
        </Card>
    );
}

export default ProfileCard;
