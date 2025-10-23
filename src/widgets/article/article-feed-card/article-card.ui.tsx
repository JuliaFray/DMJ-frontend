import React from 'react';

import moment from 'moment/moment';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Box, Chip, Tooltip } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { styles } from 'entities/article';

import { getFullName, NO_AVATAR, pathKeys } from 'shared/lib';
import { palette, theme } from 'shared/themes';
import { TArticle, TChipData } from 'shared/types';

import { CustomCardActions } from './custom-card-actions.ui';

export type PostCardProps = {
  post: TArticle;
  avatarAbbr: string;
  isOneArticlePage: boolean;
  isComments?: boolean;
  allTags?: TChipData[];
  handleAddTag?: (item: TChipData, isAuthor?: boolean) => void;
};

export const ArticleCard: React.FC<PostCardProps> = ({
  avatarAbbr,
  post,
  isOneArticlePage,
  isComments,
  allTags,
  handleAddTag,
}) => {
  const height = isOneArticlePage ? '200px' : isComments ? '100px' : '300px';
  const titleRows = 2;
  const bodyRows = 2;
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
          !isOneArticlePage && (
            <Avatar
              sx={{ bgcolor: palette.default.error }}
              alt={post.author.login}
              src={image}
              aria-label='post-avatar'
            >
              {avatarAbbr}
            </Avatar>
          )
        }
        title={
          <Link to={pathKeys.user.byId({ id: post.author._id })}>
            <Typography fontWeight={400} variant='body1' color={theme.palette.text.primary}>
              {getFullName(post.author)}
            </Typography>
          </Link>
        }
        subheader={
          <Typography variant='body2' color={theme.palette.text.secondary}>
            {moment(post.createdAt).locale('ru').fromNow()}
          </Typography>
        }
        action={
          <Link to={pathKeys.article.byId({ id: post._id })}>
            <Tooltip title='Читать далее'>
              <IconButton aria-label='forward'>
                <ChevronRightIcon />
              </IconButton>
            </Tooltip>
          </Link>
        }
      />
      {!isComments && (
        <>
          <CardContent
            className={styles.default.cardContent}
            sx={{
              '.MuiTypography-body1': {
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitLineClamp: bodyRows,
                WebkitBoxOrient: 'vertical',
                textAlign: 'justify',
              },
              '.MuiTypography-h6': {
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitLineClamp: titleRows,
                WebkitBoxOrient: 'vertical',
                textAlign: 'justify',
              },
            }}
          >
            <Typography fontWeight={500} variant='h6' style={{ marginBottom: '10px' }}>
              <Link replace to={pathKeys.article.byId({ id: post._id })}>
                {post.title}
              </Link>
            </Typography>

            <Typography variant='body1' color='text.secondary'>
              {post.text}
            </Typography>
          </CardContent>

          {!isOneArticlePage && (
            <Box className={styles.default.cardTags}>
              {!!post.tags.length &&
                post.tags.map((tag: TChipData) => (
                  <Chip
                    key={uuidv4()}
                    color='primary'
                    size='small'
                    label={`${tag.value}`}
                    className={styles.default.tag}
                    variant={allTags?.some((t) => t._id === tag._id) ? 'filled' : 'outlined'}
                    onClick={() => handleAddTag?.(tag)}
                  />
                ))}
            </Box>
          )}

          {!isOneArticlePage && (
            <CardActions disableSpacing>
              <CustomCardActions post={post} isCard />
            </CardActions>
          )}
        </>
      )}
    </Card>
  );
};
