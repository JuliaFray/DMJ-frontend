import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import {IChipData, IPost} from '../../../types/types';
import {NO_AVATAR} from '../../../Utils/DictConstants';
import CustomCardActions from './CustomCardActions';
import {getFullName} from '../../../Utils/helper';
import styles from '../Post/Post.module.scss';
import palette from './../../../styles/palette.module.scss';
import {Link} from 'react-router-dom';

export type PostCardProps = {
    post: IPost,
    avatarAbbr: string,
    isMain: boolean
}

export const PostCard: React.FC<PostCardProps> = ({avatarAbbr, post, isMain}) => {

    const mappedTags = post.tags.map((el: IChipData, index: number) =>
        <span key={index} style={{marginRight: "5px"}}>{`#${el.value}`}</span>
    );

    const height = isMain ? '350px' : '250px';
    const titleRows = isMain ? 2 : 1;
    const bodyRows = isMain ? 12 : 4;

    const image = (post.author.avatar && `data:image/jpeg;base64,${post.author.avatar?.data}`) || NO_AVATAR;
    return (
        <Card className={styles.card} sx={{height: height, display: 'flex', flexDirection: 'column', justifyContent: 'space-around'}}>
            <CardHeader
                sx={{
                    height: '20%',
                    '& .MuiTypography-subtitle1': {
                        overflow: 'hidden',
                        display: '-webkit-box',
                        WebkitLineClamp: titleRows,
                        WebkitBoxOrient: 'vertical',
                    }
                }}
                avatar={
                    !isMain && <Avatar sx={{bgcolor: palette.error}} alt={post.author.firstName} src={image} aria-label='post-avatar'>
                        {avatarAbbr}
                    </Avatar>
                }
                title={<Link to={`/posts/${post._id}`}>{post.title}</Link>}
                subheader={<Link className={styles.subtitle} to={`/users/${post.author._id}`}>{getFullName(post.author)}</Link>}
                titleTypographyProps={{
                    variant: 'subtitle1',
                    whiteSpace: 'normal'
                }}
            />

            <CardContent className={styles.cardContent} sx={{
                '.MuiTypography-body2': {
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: bodyRows,
                    WebkitBoxOrient: 'vertical'
                }
            }}>
                <Typography variant="body2" color="text.secondary">
                    {post.text}
                </Typography>


            </CardContent>

            {!isMain && <div className={styles.cardContentTags}>
                {mappedTags}
            </div>}

            {!isMain && <CardActions disableSpacing style={{position: 'relative'}}
                                     sx={{
                                          height: '10%',
                                          alignSelf: 'stretch',
                                          display: 'flex',
                                          justifyContent: 'flex-start',
                                          alignItems: 'flex-start',
                                          p: 0, m: 0
                                      }}>

                <CustomCardActions post={post} isCard/>
            </CardActions>}
        </Card>
    );
}
