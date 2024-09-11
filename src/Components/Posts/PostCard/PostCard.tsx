import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import {Link} from 'react-router-dom';
import {v4 as uuidv4} from 'uuid';
import {useQueryParams} from '../../../hook/hooks';
import {IChipData, IPost} from '../../../types/types';
import {NO_AVATAR} from '../../../Utils/DictConstants';
import {getFullName} from '../../../Utils/helper';
import styles from '../Post/Post.module.scss';
import palette from './../../../styles/palette.module.scss';
import CustomCardActions from './CustomCardActions';

export type PostCardProps = {
    post: IPost,
    avatarAbbr: string,
    isMain: boolean,
    isComments?: boolean,
}

export const PostCard: React.FC<PostCardProps> = ({avatarAbbr, post, isMain, isComments}) => {

    const {queryParams, setQueryParams} = useQueryParams({tags: ''});

    const handleTagClick = (el: IChipData) => {
        setQueryParams({tags: el.value});
    }

    const height = isMain ? '350px' : isComments ? '100px' : '250px';
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
                title={<Link to={`/${post._id}`}>{post.title}</Link>}
                subheader={<Link className={styles.subtitle} to={`/users/${post.author._id}`}>{getFullName(post.author)}</Link>}
                titleTypographyProps={{
                    variant: 'subtitle1',
                    whiteSpace: 'normal'
                }}
            />
            {!isComments &&
                <>
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
                        <ul className={styles.tags}>
                            {!!post.tags.length && post.tags.map((tag: IChipData) => (
                                <li key={uuidv4()} onClick={() => handleTagClick(tag)}>
                                    #{tag.value}
                                </li>
                            ))}
                        </ul>
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
                </>
            }


        </Card>
    );
}
