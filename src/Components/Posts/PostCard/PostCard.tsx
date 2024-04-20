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

export type PostCardProps = {
    post: IPost,
    avatarAbbr: string
}

export const PostCard: React.FC<PostCardProps> = ({avatarAbbr, post}) => {

    const mappedTags = post.tags.map((el: IChipData, index: number) =>
        <span key={index} style={{marginRight: "5px"}}>{`#${el.value}`}</span>
    );

    const image = (post.author.avatar && `data:image/jpeg;base64,${post.author.avatar?.data}`) || NO_AVATAR;
    return (
        <Card sx={{height: 250}}>
            <CardHeader
                sx={{height: 70}}
                avatar={
                    <Avatar alt={post.author.firstName} src={image} aria-label='post-avatar'>
                        {avatarAbbr}
                    </Avatar>
                }
                title={`${post.title.substring(0, 65)}${post.title.length > 65 ? '...' : ''}`}
                subheader={getFullName(post.author)}
                titleTypographyProps={{
                    variant: 'subtitle1',
                    whiteSpace: 'normal'
                }}
            />

            <CardContent className={styles.cardContent}>
                <Typography variant="body2" color="text.secondary">
                    {post.text.substring(0, 120)}{post.text.length > 120 ? '...' : ''}
                </Typography>

                <div style={{height: 10}}>
                    {mappedTags}
                </div>

            </CardContent>

            <CardActions disableSpacing style={{position: 'relative'}}
                         sx={{
                             alignSelf: 'stretch',
                             display: 'flex',
                             justifyContent: 'flex-start',
                             alignItems: 'flex-start',
                             p: 0, m: 0
                         }}>

                <CustomCardActions post={post} isCard/>
            </CardActions>
        </Card>
    );
}
