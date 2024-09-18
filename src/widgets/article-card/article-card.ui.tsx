import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import {TArticle} from 'entities/article';
import styles from 'entities/article/article.module.scss';
import {TChipData,} from 'entities/tag';
import {Link} from 'react-router-dom';
import {useQueryParams} from 'shared/hook/hooks';
import {NO_AVATAR} from 'shared/lib/DictConstants';
import {getFullName} from 'shared/lib/helper';
import palette from 'shared/themes/palette.module.scss';
import {v4 as uuidv4} from 'uuid';
import CustomCardActions from './CustomCardActions';

export type PostCardProps = {
    post: TArticle,
    avatarAbbr: string,
    isMain: boolean,
    isComments?: boolean,
}

export const ArticleCard: React.FC<PostCardProps> = ({avatarAbbr, post, isMain, isComments}) => {

    const {queryParams, setQueryParams} = useQueryParams({tags: ''});

    const handleTagClick = (el: TChipData) => {
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
                subheader={<Link className={styles.subtitle} to={`/user/${post.author._id}`}>{getFullName(post.author)}</Link>}
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
                            {!!post.tags.length && post.tags.map((tag: TChipData) => (
                                <li key={uuidv4()} onClick={() => handleTagClick(tag)}>
                                    #{tag.value}
                                </li>
                            ))}
                        </ul>
                    </div>}

                    {!isMain && <CardActions disableSpacing style={{position: 'relative', marginLeft: '20px',}}
                                             sx={{
                                                 height: '12%',
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
