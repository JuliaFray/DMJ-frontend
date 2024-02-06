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
import {PostType} from '../../../types/types';
import {markPostFavorite} from '../../../redux/posts/posts-thunks';
import Badge from '@mui/material/Badge';
import {Link} from 'react-router-dom';
import {DoubleArrow, Visibility} from '@mui/icons-material';
import {Tooltip} from '@mui/material';
import {useAppDispatch} from '../../../hook/hooks';
import {BASE_URL} from '../../../api/api';

export type PostCardProps = {
    post: PostType,
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
        <Card sx={{maxWidth: 345}}>
            <CardHeader
                avatar={
                    <Avatar sx={{bgcolor: red[500]}} aria-label="recipe">
                        {avatarAbbr}
                    </Avatar>
                }
                title={post.title}
                subheader={post.dateStr}
            />

            {!!post.imageUrl && <CardMedia
                component="img"
                height="100"
                image={post.imageUrl?.includes('http')
                    ? post.imageUrl : `${BASE_URL}${post.imageUrl}`}
                alt="Uploaded"
            />}

            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {post.text.substring(0, 50)}...
                </Typography>

                {mappedTags}
            </CardContent>

            <CardActions style={{position: 'relative'}}>
                <IconButton aria-label="add to favorites" onClick={onClickFavorite}>
                    <FavoriteIcon color={isFavorite ? 'error' : 'primary'}/>
                </IconButton>

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

                <Link to={`/posts/${post._id}`} style={{position: 'absolute', right: '0'}}>
                    <Tooltip title="Читать далее">
                        <IconButton aria-label="forward">
                            <DoubleArrow/>
                        </IconButton>
                    </Tooltip>

                </Link>
            </CardActions>
        </Card>
    );
}
