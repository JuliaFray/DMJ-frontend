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
}

export const UserCard: React.FC<PostCardProps> = ({user, toggleFollow}) => {

    const [isFollowed, setIsFollowed] = useState(user.isFollowed);

    const image = user.avatar && `data:image/jpeg;base64,${user.avatar?.data}` || NO_AVATAR;

    const handleClick = () => {

    }

    const handleFollowClick = () => {
        setIsFollowed(!isFollowed)
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
                <Tooltip title={isFollowed ? 'Отписаться' : 'Подписаться'}>
                    <Button className={styles.btn} onClick={handleFollowClick} size='small' variant='outlined' startIcon={<Loyalty/>}>
                        <span className={styles.btnText}>{isFollowed ? 'Отписаться' : 'Подписаться'}</span>
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
