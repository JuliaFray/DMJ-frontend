import React, {useState} from 'react';

import {SideBlock} from '../../Common/SideBlock/SideBlockComponent';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import Skeleton from '@mui/material/Skeleton';
import {IComment} from '../../../types/types';
import {NO_AVATAR} from '../../../Utils/DictConstants';
import {Link} from 'react-router-dom';
import {getFullName} from '../../../Utils/helper';
import styles from './Comment.module.scss';
import IconButton from '@mui/material/IconButton';
import {ArrowDropDown, ArrowDropUp} from '@mui/icons-material';
import {useAppDispatch} from '../../../hook/hooks';
import {v4 as uuidv4} from 'uuid';
import {toggleCommentRating} from '../../../redux/posts/posts-thunks';
import {Box} from '@mui/material';
import moment from 'moment/moment';
import Stack from '@mui/material/Stack';

export type ICommentsBlock = {
    items: IComment[],
    children: any,
    isLoading: boolean
}

export const CommentsBlock: React.FC<ICommentsBlock> = ({items, children, isLoading = true}) => {

    return (
        <SideBlock title='Комментарии'>
            <List>
                {(isLoading ? [...Array(5)] : items)?.map((obj: IComment) => (
                    <CommentItem key={uuidv4()} item={obj} isLoading={isLoading}/>
                ))}
            </List>
            {children}
        </SideBlock>
    );
};

type ICommentType = {
    item: IComment,
    isLoading: boolean
}

const CommentItem: React.FC<ICommentType> = ({item, isLoading}, context) => {

    const dispatch = useAppDispatch();

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
                        <Link key={uuidv4()} className={styles.name} to={`/users/${item.author._id}`}>{getFullName(item.author)}</Link>
                    </ListItemText>

                )}

                <Stack key={uuidv4()} spacing={1} direction={'column'}>

                    <span key={uuidv4()}>{moment(item.createdAt).fromNow()}</span>
                    <Stack key={uuidv4()} spacing={1} direction={'row'}>
                        <Box key={uuidv4()}>
                            <IconButton key={uuidv4()} disabled={userRating === -1} aria-label='up rating' onClick={() => onClickRating(-1)}>
                                <ArrowDropDown key={uuidv4()}/>
                            </IconButton>

                            <span key={uuidv4()}>{rating}</span>

                            <IconButton key={uuidv4()} disabled={userRating === 1} aria-label='down rating' onClick={() => onClickRating(1)}>
                                <ArrowDropUp key={uuidv4()}/>
                            </IconButton>
                        </Box>
                    </Stack>
                </Stack>


            </ListItem>
            <Divider key={uuidv4()} variant='inset' component='li'/>
        </React.Fragment>
    )
}
