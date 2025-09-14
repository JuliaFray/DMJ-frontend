import React from 'react';

import moment from 'moment/moment';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import TagIcon from '@mui/icons-material/Tag';
import { Chip } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';

import { getFullName, NO_AVATAR } from 'shared/lib';
import { palette } from 'shared/themes';
import { TArticle, TChipData } from 'shared/types';

import { styles } from 'entities/article';

import { CustomCardActions } from './custom-card-actions.ui';

export type PostCardProps = {
  post: TArticle;
  avatarAbbr: string;
  isMain: boolean;
  isComments?: boolean;
  allTags?: TChipData[];
  handleAddTag?: (item: TChipData, isAuthor?: boolean) => void;
};

export const ArticleCard: React.FC<PostCardProps> = ({
  avatarAbbr,
  post,
  isMain,
  isComments,
  allTags,
  handleAddTag,
}) => {
  const height = isMain ? '450px' : isComments ? '100px' : '300px';
  const titleRows = 2;
  const bodyRows = isMain ? 8 : 4;
  const image =
    (post.author.avatar && `data:image/jpeg;base64,${post.author.avatar?.data}`) || NO_AVATAR;
  return (
    <Card
      className={styles.default.card}
      sx={{
        height,
      }}
    >
      <CardHeader
        sx={{
          height: '20%',
          '& .MuiTypography-subtitle1': {
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: titleRows,
            WebkitBoxOrient: 'vertical',
          },
        }}
        avatar={
          !isMain && (
            <Avatar
              sx={{ bgcolor: palette.default.error }}
              alt={post.author.firstName}
              src={image}
              aria-label='post-avatar'
            >
              {avatarAbbr}
            </Avatar>
          )
        }
        title={
          <Link className={styles.default.subtitle} to={`/user/${post.author._id}`}>
            {getFullName(post.author)}
          </Link>
        }
        subheader={moment(post.createdAt).locale('ru').fromNow()}
        titleTypographyProps={{
          variant: 'subtitle1',
          whiteSpace: 'normal',
        }}
      />
      {!isComments && (
        <>
          <CardContent
            className={styles.default.cardContent}
            sx={{
              '.MuiTypography-body2': {
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitLineClamp: bodyRows,
                WebkitBoxOrient: 'vertical',
                textIndent: '25px',
                textAlign: 'justify',
              },
              '.MuiTypography-subtitle1': {
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitLineClamp: titleRows,
                WebkitBoxOrient: 'vertical',
                textIndent: '25px',
                textAlign: 'justify',
              },
            }}
          >
            <Typography variant='subtitle1' style={{ marginBottom: '10px' }}>
              <Link replace to={`/article/${post._id}`}>
                {post.title}
              </Link>
            </Typography>

            <Typography variant='body2' color='text.secondary'>
              {post.text}
            </Typography>
          </CardContent>

          {!isMain && (
            <div className={styles.default.cardContentTags}>
              {!!post.tags.length &&
                post.tags.map((tag: TChipData) => (
                  <Chip
                    key={uuidv4()}
                    color={allTags?.some((t) => t._id === tag._id) ? 'primary' : 'secondary'}
                    icon={<TagIcon className={styles.default.icon} />}
                    size='small'
                    label={`${tag.value}`}
                    className={styles.default.tag}
                    variant={allTags?.some((t) => t._id === tag._id) ? 'filled' : 'outlined'}
                    onClick={() => handleAddTag?.(tag)}
                  />
                ))}
            </div>
          )}

          {!isMain && (
            <CardActions
              disableSpacing
              style={{ position: 'relative', marginLeft: '20px' }}
              sx={{
                height: '12%',
                alignSelf: 'stretch',
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                p: 0,
                m: 0,
              }}
            >
              <CustomCardActions post={post} isCard />
            </CardActions>
          )}
        </>
      )}
    </Card>
  );
};
