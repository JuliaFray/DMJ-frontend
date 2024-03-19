import * as React from 'react';
import {useState} from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import {red} from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {IPost} from '../../../types/types';
import {markPostFavorite} from '../../../redux/posts/posts-thunks';
import Badge from '@mui/material/Badge';
import {Link} from 'react-router-dom';
import {DoubleArrow, Visibility} from '@mui/icons-material';
import {Box, Tooltip} from '@mui/material';
import {useAppDispatch} from '../../../hook/hooks';
import {BASE_URL} from '../../../api/api';
import {NO_AVATAR} from '../../../Utils/DictConstants';

export type PostCardProps = {
    post: IPost,
    avatarAbbr: string
}

export const PostCard: React.FC<PostCardProps> = ({avatarAbbr, post}) => {

    const [isFavorite, setIsFavorite] = useState(!!post.likes);
    const dispatch = useAppDispatch();

    const mappedTags = post.tags.map((el: string, index: number) =>
        <span key={index} style={{marginRight: "5px"}}>{`#${el.trim()}`}</span>
    );

    const onClickFavorite = () => {
        setIsFavorite(!isFavorite);
        dispatch(markPostFavorite({postId: post._id}));
    }

    return (
        <Card sx={{maxWidth: 345, height: 350}}>
            <CardHeader
                sx={{height: 100}}
                avatar={
                    <Avatar alt={post.author.firstName} src={post.author.avatarUrl || NO_AVATAR} sx={{bgcolor: red[500]}} aria-label="recipe">
                        {avatarAbbr}
                    </Avatar>
                }
                title={`${post.title.substring(0, 40)}...`}
                subheader={post.dateStr}
                titleTypographyProps={{variant: 'subtitle1',
                    whiteSpace: 'normal'
            }}
            />

            {!!post.imageUrl
                ? <CardMedia
                    component="img"
                    height="100"
                    image={post.imageUrl?.includes('http')
                        ? post.imageUrl : `${BASE_URL}${post.imageUrl}`}
                    alt="Uploaded"/>
                : <Box sx={{height: 100}}></Box>}

            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {post.text.substring(0, 50)}...
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
                <Tooltip title='В избранное'>
                    <IconButton aria-label="add to favorites" onClick={onClickFavorite}>
                        <FavoriteIcon color={isFavorite ? 'error' : 'primary'}/>
                    </IconButton>
                </Tooltip>

                <Tooltip title='Просмотры'>
                    <IconButton aria-label="viewsCount">
                        <Badge
                            showZero={true}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            badgeContent={post.viewsCount}
                            color="primary">
                            <Visibility/>
                        </Badge>
                    </IconButton>
                </Tooltip>

                <Link to={`/posts/${post._id}`} style={{position: 'absolute', right: '0'}}>
                    <Tooltip title='Читать далее'>
                        <IconButton aria-label='forward'>
                            <DoubleArrow/>
                        </IconButton>
                    </Tooltip>
                </Link>
            </CardActions>
        </Card>
    );
}
