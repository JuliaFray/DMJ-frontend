import * as React from 'react';
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
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {PostType} from '../../../types/types';
import {MenuWithHeader} from './PostMenu';
import {deletePost} from '../../../redux/posts/posts-thunks';
import Badge from '@mui/material/Badge';
import {Link, NavLink, useNavigate} from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import {DoubleArrow, Forward, Forward10Rounded, Visibility} from '@mui/icons-material';
import {Tooltip} from '@mui/material';

export type PostCardProps = {
    post: PostType,
    avatarAbbr: string
}

export const PostCard: React.FC<PostCardProps> = ({avatarAbbr, post}) => {

    const navigate = useNavigate();

    const redirectToPost = (post: PostType) => {
        navigate(`/posts/${post._id}/edit`);
    }

    const mappedTags = post.tags.map((el: string, index: number) =>
        <span key={index} style={{marginRight: "5px"}}>{`#${el.trim()}`}</span>
    );

    const options = [
        {name: 'Редактировать', action: redirectToPost, type: 'function'},
        {name: 'Удалить', action: deletePost, type: 'thunk'}
    ];

    return (
        <>
            <Card sx={{maxWidth: 345}}>
                <CardHeader
                    avatar={
                        <Avatar sx={{bgcolor: red[500]}} aria-label="recipe">
                            {avatarAbbr}
                        </Avatar>
                    }
                    action={<MenuWithHeader options={options} payload={post}/>}
                    title={post.title}
                    subheader={post.dateStr}
                />

                {!!post.imageUrl && <CardMedia
                    component="img"
                    height="100"
                    image={post.imageUrl?.includes('http')
                        ? post.imageUrl : `http://localhost:8000${post.imageUrl}`}
                    alt="Uploaded"
                />}

                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {post.text.substring(0, 50)}...
                    </Typography>

                    {mappedTags}
                </CardContent>

                <CardActions style={{position: 'relative'}}>
                    <IconButton aria-label="add to favorites">
                        <Badge
                            showZero={true}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            badgeContent={post.likes}
                            color="primary">
                            <FavoriteIcon/>
                        </Badge>
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
                        <Tooltip title="Перейти">
                            <IconButton aria-label="delete">
                                <DoubleArrow/>
                            </IconButton>
                        </Tooltip>

                    </Link>
                </CardActions>

            </Card>
        </>
    );
}
