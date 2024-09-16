import React, {useState} from 'react';
import {ArrowDropDown, ArrowDropUp} from '@mui/icons-material';
import {Box} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import {TCommentType} from 'entities/comment';
import moment from 'moment/moment';
import {useSelector} from "react-redux";
import {Link} from 'react-router-dom';
import {useAppDispatch} from 'shared/hook/hooks';
import {NO_AVATAR} from 'shared/lib/DictConstants';
import {getFullName} from 'shared/lib/helper';
import {authSelector} from "shared/model/auth";
import {toggleCommentRating} from 'shared/model/posts/posts-thunks';
import {v4 as uuidv4} from 'uuid';
import styles from './comment.module.scss';


export const Comment: React.FC<TCommentType> = ({item, isLoading}, context) => {

    const dispatch = useAppDispatch();
    const isAuth = useSelector(authSelector.getIsAuth);

    const [rating, setRating] = useState(item.rating || 0);
    const [userRating, setUserRating] = useState(item.userRating || 0);

    const onClickRating = (val: number) => {
        setRating(rating + val);
        setUserRating(userRating + val);
        if(item._id) {
            dispatch(toggleCommentRating({commentId: item._id, rating: userRating + val}));
        }
    }

    return (
        <React.Fragment key={uuidv4()}>
            <ListItem alignItems='flex-start'>
                <ListItemAvatar key={uuidv4()}>
                    {isLoading ? (
                        <Skeleton key={uuidv4()} variant='circular' width={40} height={40}/>
                    ) : (
                        <Avatar key={uuidv4()} alt={item.author?.firstName}
                                src={(item.author?.avatar && `data:image/jpeg;base64,${item.author?.avatar.data}`) || NO_AVATAR}
                        />
                    )}
                </ListItemAvatar>
                {isLoading || !item.author ? (
                    <div key={uuidv4()} style={{display: 'flex', flexDirection: 'column'}}>
                        <Skeleton key={uuidv4()} variant='text' height={25} width={120}/>
                        <Skeleton key={uuidv4()} variant='text' height={18} width={230}/>
                    </div>
                ) : (
                    <ListItemText key={uuidv4()} secondary={item.text}>
                        <Link key={uuidv4()} className={styles.name} to={`/user/${item.author._id}`}>{getFullName(item.author)}</Link>
                    </ListItemText>

                )}

                <Stack key={uuidv4()} spacing={1} direction={'column'}>

                    <span key={uuidv4()}>{moment(item.createdAt).fromNow()}</span>
                    {isAuth && <Stack key={uuidv4()} spacing={1} direction={'row'}>
                        <Box key={uuidv4()}>
                            <IconButton key={uuidv4()} disabled={userRating === -1} aria-label='up rating' onClick={() => onClickRating(-1)}>
                                <ArrowDropDown key={uuidv4()}/>
                            </IconButton>

                            <span key={uuidv4()}>{rating}</span>

                            <IconButton key={uuidv4()} disabled={userRating === 1} aria-label='down rating' onClick={() => onClickRating(1)}>
                                <ArrowDropUp key={uuidv4()}/>
                            </IconButton>
                        </Box>
                    </Stack>}
                </Stack>


            </ListItem>
            <Divider key={uuidv4()} variant='inset' component='li'/>
        </React.Fragment>
    )
}
