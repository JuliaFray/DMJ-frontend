import * as React from 'react';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import {IUser} from '../../../types/types';
import {Link} from 'react-router-dom';
import {Article, Chat, Grade, ImportExport, Insights, Loyalty, People, PersonAddAlt1} from '@mui/icons-material';
import {Box, Button, Tooltip, Typography} from '@mui/material';
import {NO_AVATAR} from '../../../Utils/DictConstants';
import CardContent from '@mui/material/CardContent';
import {getFullName} from '../../../Utils/helper';
import styles from './UserCard.module.scss';
import useWebSocket from 'react-use-websocket';
import {WS_URL} from '../../../config/wsConfig';
import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';

export type PostCardProps = {
    user: IUser,
    follow: (userId: string) => void,
    unfollow: (userId: string) => void
}

export const UserCard: React.FC<PostCardProps> = ({user, follow}) => {

    const image = user.avatar && `data:image/jpeg;base64,${user.avatar?.data}` || NO_AVATAR;

    const {sendJsonMessage, readyState} = useWebSocket(WS_URL, {
        onOpen: () => {
            console.log('Ws connected');
        },
        share: true,
        filter: () => false,
        retryOnError: true,
        shouldReconnect: () => true
    })

    const handleClick = () => {
        sendJsonMessage("msg");
    }

    const handleFollowClick = () => {
        console.log(user)
        follow(user._id);
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
                <Tooltip title={'Подписаться'}>
                    <Button className={styles.btn} onClick={handleFollowClick} size='small' variant='outlined' startIcon={<Loyalty/>}>
                        <span className={styles.btnText}>{user.isFollowed ? 'Отписаться' : 'Подписаться'}</span>
                    </Button>
                </Tooltip>

                <Tooltip title={'В друзья'}>
                    <Button className={styles.btn} size='small' variant='outlined' startIcon={<PersonAddAlt1/>}>
                        <span className={styles.btnText}>В друзья</span>
                    </Button>
                </Tooltip>

                <Tooltip title={'Написать'}>
                    <Button className={styles.btn} onClick={handleClick} size='small' variant='outlined' startIcon={<Chat/>}>
                        <span className={styles.btnText}>Написать</span>
                    </Button>
                </Tooltip>

            </Box>
        </Card>
    );
}
