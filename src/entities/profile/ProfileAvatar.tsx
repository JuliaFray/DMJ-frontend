import React, {ChangeEvent, Dispatch, SetStateAction, useEffect, useRef, useState} from 'react';
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Tooltip, Typography} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import {TProfile} from 'entities/profile';
import {useSelector} from 'react-redux';
import useWebSocket, {useAppDispatch} from 'shared/hook/hooks';
import {SocketEvents} from 'shared/lib/DictConstants';
import {getFullName} from 'shared/lib/helper';
import {getAuthId} from 'shared/model/auth/auth-selectors';
import {toggleFollowProfile} from 'shared/model/profile/profile-thunks';
import {Image, ImageBackdrop, ImageButton, ImageMarked, ImageSrc} from 'shared/ui/ImageButton/ImageButton';
import styles from './ProfileInfo.module.scss';

type IProfileAvatar = {
    profile: TProfile,
    isOwner: boolean,
    editMode: boolean,
    setEditMode: (isChanged: boolean) => void,
    file: File | string | null,
    setFile: Dispatch<SetStateAction<File | string | null>>
}

const ProfileAvatar: React.FC<IProfileAvatar> = (props, context) => {

    const [isFollowed, setIsFollowed] = useState(props.profile.isFollowed);
    const [open, setOpen] = React.useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const authId = useSelector(getAuthId);
    const dispatch = useAppDispatch();

    const ws = useWebSocket();

    useEffect(() => {
        props.setFile(props.profile?.avatar?.data);
    }, [])

    const handleChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
        const files = (event.target as HTMLInputElement).files;
        if(files?.length) {
            props.setFile(files[0]);
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

    const image = props.file
        ? typeof props.file === 'string'
            ? `data:image/jpeg;base64,${props.file}`
            : URL.createObjectURL(props.file)
        : '';

    return (
        <>
            {!props.editMode && <Avatar variant='rounded'
                                        className={styles.avatar}
                                        src={image}
                                        alt={props.profile.firstName}/>}

            {props.editMode && <div className={styles.avatar}>
                <input ref={inputRef} type='file' onChange={handleChangeFile} hidden/>
                <ImageButton focusRipple key={props.profile.firstName} onClick={() => inputRef.current?.click()}>

                    <Image>
                        <ImageSrc style={{backgroundImage: `url(${image})`}}/>
                        <ImageBackdrop className='MuiImageBackdrop-root'/>
                        <Tooltip title={'Объем изображения не должен превышать 5Мб'}>
                            <Typography
                                component='span'
                                variant='subtitle1'
                                color='inherit'
                                sx={{
                                    position: 'relative',
                                    p: 4,
                                    pt: 2,
                                    pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                                }}>
                                Загрузить
                                <ImageMarked className='MuiImageMarked-root'/>
                            </Typography>
                        </Tooltip>
                    </Image>
                </ImageButton>
            </div>}

            <div className={styles.btnBlock}>
                {props.editMode &&
                    <Button className={styles.button}
                            variant='outlined' onClick={() => props.setEditMode(false)}>
                        Отмена
                    </Button>
                }
                {props.isOwner &&
                    <Button className={styles.button}
                            variant='outlined' onClick={() => props.setEditMode(true)}>
                        {props.editMode ? 'Сохранить' : 'Редактировать'}
                    </Button>
                }

                {!props.isOwner &&
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
        </>
    )
}

export default ProfileAvatar;
