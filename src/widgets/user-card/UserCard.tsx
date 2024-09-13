import * as React from 'react';
import {useState} from 'react';
import {Chat, Loyalty} from '@mui/icons-material';
import {Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Tooltip, Typography} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {TUser} from 'entities/profile';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import useWebSocket from 'shared/hook/hooks';
import {NO_AVATAR, SocketEvents} from 'shared/lib/DictConstants';
import {getFullName} from 'shared/lib/helper';
import {getAuthId} from 'shared/model/auth/auth-selectors';
import styles from './UserCard.module.scss';

export type PostCardProps = {
    user: TUser,
    toggleFollow: (userId: string, isFollow: boolean) => void,
}

export const UserCard: React.FC<PostCardProps> = ({user, toggleFollow}) => {

    const ws = useWebSocket();
    const authId = useSelector(getAuthId);
    const [isFollowed, setIsFollowed] = useState(user.isFollowed);
    const [open, setOpen] = React.useState(false);

    const image = user.avatar && `data:image/jpeg;base64,${user.avatar?.data}` || NO_AVATAR;

    const handleMessageClick = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleFollowClick = () => {
        setIsFollowed((prevState) => !prevState)
        toggleFollow(user._id, !isFollowed);
    }

    const onSubmit = (event: React.FormEvent<HTMLFormElement>, user: TUser) => {
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

    return (
        <Card className={styles.userCard}>
            <div className={styles.cardContent}>
                <Avatar alt={user.firstName} src={image} aria-label="avatar" className={styles.userAvatar}/>
                <div className={styles.userInfo}>
                    <CardContent>
                        <Typography component="div" variant="h5">
                            <Link to={`/users/${user._id}`}>{getFullName(user)}</Link>
                        </Typography>
                    </CardContent>
                </div>
            </div>


            <Box className={styles.cardActions}>
                {isFollowed
                    ? <Tooltip title={'Отписаться'}>
                        <Button className={styles.btn} onClick={handleFollowClick} size='medium' variant='contained' startIcon={<Loyalty/>}>
                            <span className={styles.btnText}>Отписаться</span>
                        </Button>
                    </Tooltip>
                    : <Tooltip title={'Подписаться'}>
                        <Button className={styles.btn} onClick={handleFollowClick} size='medium' variant='outlined' startIcon={<Loyalty/>}>
                            <span className={styles.btnText}>Подписаться</span>
                        </Button>
                    </Tooltip>}

                <Tooltip title={'Написать'}>
                    <Button className={styles.btn} onClick={handleMessageClick} size='medium' variant='outlined' startIcon={<Chat/>}>
                        <span className={styles.btnText}>Написать</span>
                    </Button>
                </Tooltip>

                <Dialog
                    open={open}
                    fullWidth
                    onClose={handleClose}
                    PaperProps={{
                        component: 'form',
                        onSubmit: (event: React.FormEvent<HTMLFormElement>) => onSubmit(event, user),
                    }}
                >
                    <DialogTitle>Отправить сообщение</DialogTitle>
                    <DialogContent>
                        <DialogContentText>Кому: {getFullName(user)}</DialogContentText>
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

            </Box>
        </Card>
    );
}
