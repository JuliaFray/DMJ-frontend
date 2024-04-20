import * as React from 'react';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import {IUser} from '../../../types/types';
import {Link} from 'react-router-dom';
import {Article, Chat, Insights, People, PersonAddAlt1} from '@mui/icons-material';
import {Box, Button, Typography} from '@mui/material';
import {NO_AVATAR} from '../../../Utils/DictConstants';
import CardContent from '@mui/material/CardContent';
import {getFullName} from '../../../Utils/helper';
import styles from './UserCard.module.scss';
import useWebSocket from 'react-use-websocket';
import {WS_URL} from '../../../config/wsConfig';

export type PostCardProps = {
    user: IUser,
    follow: (userId: string) => void,
    unfollow: (userId: string) => void
}

export const UserCard: React.FC<PostCardProps> = ({user}) => {

    const image = user?.avatar && `data:image/jpeg;base64,${user?.avatar?.data}` || NO_AVATAR;

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

                    <div className={styles.stats}>
                        <Article color={'disabled'}/><span>10</span>
                        <Insights color={'disabled'}/><span>-1</span>
                        <People color={'disabled'}/><span>0</span>
                    </div>
                </div>
            </div>


            <Box className={styles.cardActions}>
                <Button size='large' variant='outlined' startIcon={<PersonAddAlt1/>}>
                    В друзья
                </Button>

                <Button onClick={handleClick} size='large' variant='outlined' startIcon={<Chat/>}>
                    Написать
                </Button>
            </Box>
        </Card>
    );
}
