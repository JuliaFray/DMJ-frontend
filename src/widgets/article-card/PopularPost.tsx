import React from 'react';
import {DoubleArrow} from '@mui/icons-material';
import {Box, Tooltip, Typography} from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import {TArticle} from 'entities/article';
import {Link} from 'react-router-dom';
import palette from 'shared/themes/palette.module.scss';
import {theme} from 'shared/themes/theme';

export type IPopularPost = {
    post: TArticle
}
export const PopularPost: React.FC<IPopularPost> = ({post}, context) => {

    const cardSx = {
        height: 250,
        mx: 'auto',
        margin: 0,
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '4px',
        boxShadow: `0 8px 24px ${theme.palette.grey[400]}`,
        transition: 'transform 0.15s ease-in-out',
        display: 'flex'
    };

    const boxSx = {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: palette.warning,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.1,
        transition: 'opacity 0.3s ease-in-out',
        '&:hover': {
            opacity: 0.2,
        }
    };

    return (
        <Card sx={cardSx}>
            <Box sx={{display: 'flex', flexDirection: 'column'}}>
                <CardContent sx={{
                    flex: '1 0 auto',
                    height: 250,
                    '& .MuiTypography-h4': {
                        overflow: 'hidden',
                        display: '-webkit-box',
                        WebkitLineClamp: '2',
                        WebkitBoxOrient: 'vertical'
                    },
                    '.MuiTypography-body2': {
                        overflow: 'hidden',
                        display: '-webkit-box',
                        WebkitLineClamp: '6',
                        WebkitBoxOrient: 'vertical'
                    }
                }}>
                    <Typography variant="h4" component="p">
                        {post.title}
                    </Typography>
                    <Typography variant="body2" component="p">
                        {post.text}
                    </Typography>
                </CardContent>

                <Box sx={boxSx}>
                    {post?.image &&
                        <img style={{
                            width: '100%',
                            height: '100%',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover'
                        }}
                             src={`data:image/jpeg;base64,${post.image.data}`}
                             alt={'postImage'}
                        />}
                </Box>

            </Box>

            <Box sx={{width: '100%', display: 'flex', alignItems: 'end', pl: 1, pb: 1, justifyContent: 'end'}}>
                <Link to={`article/${post._id}`}>
                    <Tooltip title="Читать далее">
                        <IconButton aria-label="forward">
                            <DoubleArrow/>
                        </IconButton>
                    </Tooltip>
                </Link>
            </Box>

        </Card>
    )
}
