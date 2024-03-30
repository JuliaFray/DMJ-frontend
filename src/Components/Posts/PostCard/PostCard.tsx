import * as React from 'react';
import {useState} from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import {red} from '@mui/material/colors';
import {IPost} from '../../../types/types';
import {markPostFavorite, togglePostRating} from '../../../redux/posts/posts-thunks';
import Badge from '@mui/material/Badge';
import {Link} from 'react-router-dom';
import {ArrowDropDown, ArrowDropUp, DoubleArrow, Grade, Visibility} from '@mui/icons-material';
import {Tooltip} from '@mui/material';
import {useAppDispatch} from '../../../hook/hooks';
import {NO_AVATAR} from '../../../Utils/DictConstants';
import CustomCardActions from '../CustomCardActions';

export type PostCardProps = {
    post: IPost,
    avatarAbbr: string
}

export const PostCard: React.FC<PostCardProps> = ({avatarAbbr, post}) => {

    const [isFavorite, setIsFavorite] = useState(!!post.likes);
    const [rating, setRating] = useState(post.rating || 0);
    const [userRating, setUserRating] = useState( post.userRating || 0);

    const dispatch = useAppDispatch();

    const mappedTags = post.tags.map((el: string, index: number) =>
        <span key={index} style={{marginRight: "5px"}}>{`#${el.trim()}`}</span>
    );

    const onClickFavorite = () => {
        setIsFavorite(!isFavorite);
        dispatch(markPostFavorite({postId: post._id}));
    }

    const onClickRating = (val: number) => {
        setRating(rating + val);
        setUserRating(userRating + val);
        dispatch(togglePostRating({postId: post._id, rating: userRating + val}));
    }

    const image = post.author.avatar && `data:image/jpeg;base64,${post.author.avatar?.data}` || NO_AVATAR;
    return (
        <Card sx={{height: 250}}>
            <CardHeader
                sx={{height: 70}}
                avatar={
                    <Avatar alt={post.author.firstName} src={image} sx={{bgcolor: red[500]}} aria-label="recipe">
                        {avatarAbbr}
                    </Avatar>
                }
                title={`${post.title.substring(0, 40)}...`}
                subheader={`${post.author.firstName} ${post.author.secondName}`}
                titleTypographyProps={{
                    variant: 'subtitle1',
                    whiteSpace: 'normal'
                }}
            />

            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {post.text.substring(0, 60)}...
                </Typography>

                {mappedTags}
            </CardContent>

            <CardActions disableSpacing style={{position: 'relative'}}
                         sx={{
                             alignSelf: 'stretch',
                             display: 'flex',
                             justifyContent: 'flex-start',
                             alignItems: 'flex-start',
                             p: 0,
                         }}>

                <CustomCardActions post={post} userRating={userRating} rating={rating} isFavorite={isFavorite}
                                   onClickRating={onClickRating} onClickFavorite={onClickFavorite} isCard={true}/>
            </CardActions>
        </Card>
    );
}
