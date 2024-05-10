import * as React from 'react';
import {useState} from 'react';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import {IUser} from '../../../types/types';
import {Link} from 'react-router-dom';
import {Chat, Loyalty, PersonAddAlt1} from '@mui/icons-material';
import {Box, Button, Tooltip, Typography} from '@mui/material';
import {NO_AVATAR} from '../../../Utils/DictConstants';
import CardContent from '@mui/material/CardContent';
import {getFullName} from '../../../Utils/helper';
import styles from './UserCard.module.scss';

export type PostCardProps = {
    user: IUser,
    toggleFollow: (userId: string, isFollow: boolean) => void,
    toggleFriend: (userId: string, isAddFriend: boolean) => void,
}

export const UserCard: React.FC<PostCardProps> = ({user, toggleFollow, toggleFriend}) => {

    const [isFollowed, setIsFollowed] = useState(user.isFollowed);
    const [isFriend, setIsFriend] = useState(user.isFriend);

    const image = user.avatar && `data:image/jpeg;base64,${user.avatar?.data}` || NO_AVATAR;

    const handleMessageClick = () => {

    }

    const handleFriendClick = () => {
        setIsFriend((prevState) => !prevState);
        toggleFriend(user._id, !isFriend);
    }

    const handleFollowClick = () => {
        setIsFollowed((prevState) => !prevState)
        toggleFollow(user._id, !isFollowed);
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
                        <Button className={styles.btn} onClick={handleFollowClick} size='small' variant='contained' startIcon={<Loyalty/>}>
                            <span className={styles.btnText}>Отписаться</span>
                        </Button>
                    </Tooltip>
                    : <Tooltip title={'Подписаться'}>
                        <Button className={styles.btn} onClick={handleFollowClick} size='small' variant='outlined' startIcon={<Loyalty/>}>
                            <span className={styles.btnText}>Подписаться</span>
                        </Button>
                    </Tooltip>}

                {isFriend
                    ? <Tooltip title={'Удалить из друзей'}>
                        <Button className={styles.btn} onClick={handleFriendClick} size='small' variant='contained' startIcon={<PersonAddAlt1/>}>
                            <span className={styles.btnText}>Удалить из друзей</span>
                        </Button>
                    </Tooltip>
                    : <Tooltip title={'В друзья'}>
                        <Button className={styles.btn} onClick={handleFriendClick} size='small' variant='outlined' startIcon={<PersonAddAlt1/>}>
                            <span className={styles.btnText}>В друзья</span>
                        </Button>
                    </Tooltip>}


                <Tooltip title={'Написать'}>
                    <Button className={styles.btn} onClick={handleMessageClick} size='small' variant='outlined' startIcon={<Chat/>}>
                        <span className={styles.btnText}>Написать</span>
                    </Button>
                </Tooltip>

            </Box>
        </Card>
    );
}

