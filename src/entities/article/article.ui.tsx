import React, { FC, useState } from 'react';

import clsx from 'clsx';
import moment from 'moment';
import ReactMarkdown from 'react-markdown';
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { Delete } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import {
  Box,
  Button,
  CardHeader,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Tooltip,
  Typography,
} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import DialogContentText from '@mui/material/DialogContentText';
import IconButton from '@mui/material/IconButton';

import { ArticleCard, CustomCardActions } from 'widgets/article';

import { ArticleSkeleton } from 'entities/article';

import { useAppDispatch } from 'shared/hook';
import { getFullName, getImage, pathKeys } from 'shared/lib';
import { deletePost } from 'shared/model';
import { palette, theme } from 'shared/themes';
import { IPost, TChipData } from 'shared/types';

import styles from './article.module.scss';

type ArticleProps = {
  post: IPost;
  isFullPost: boolean;
  isLoading: boolean;
  isEditable: boolean;
};

export const Article: FC<ArticleProps> = ({ post, isFullPost, isLoading, isEditable }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [openDialog, setOpenDialog] = useState(false);

  const handleDelete = () => {
    setOpenDialog(false);
    dispatch(deletePost({ payload: post }));
    navigate(pathKeys.article.root());
  };

  if (isLoading) {
    return <ArticleSkeleton />;
  }

  // return <ArticleCard post={post} isOneArticlePage />;

  return (
    <>
      <Card>
        <CardHeader
          avatar={
            <Avatar
              sx={{ bgcolor: palette.default.error }}
              alt={post.userId.login}
              src={getImage(post.userId.avatar, true)}
              aria-label='post-avatar'
            >
              {post.userId.login}
            </Avatar>
          }
          title={
            <Link to={pathKeys.user.byId({ id: post.userId._id })}>
              <Typography fontWeight={400} variant='body1' color={theme.palette.text.primary}>
                {getFullName(post.userId)}
              </Typography>
            </Link>
          }
          subheader={
            <Typography variant='body2' color={theme.palette.text.secondary}>
              {moment(post.createdAt).locale('ru').fromNow()}
            </Typography>
          }
          action={
            isEditable && (
              <div>
                <Link to={pathKeys.article.editor.byId({ id: post._id })}>
                  <Tooltip title='Редактировать'>
                    <IconButton color='primary'>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                </Link>
                <IconButton onClick={() => setOpenDialog(true)} color='error'>
                  <Tooltip title='Удалить'>
                    <Delete />
                  </Tooltip>
                </IconButton>
              </div>
            )
          }
        />

        <CardContent>
          <Typography fontWeight={500} variant='h6' style={{ marginBottom: '10px' }}>
            {isFullPost ? (
              post.title
            ) : (
              <Link key={post._id} to={pathKeys.article.byId({ id: post._id })}>
                {post.title}
              </Link>
            )}
          </Typography>

          <ReactMarkdown className={clsx(styles.text)}>{post.text}</ReactMarkdown>
        </CardContent>

        {!!post.tags?.length && (
          <Box className={styles.tags}>
            {post.tags.length &&
              post.tags.map((tag: TChipData) => (
                <Chip
                  key={uuidv4()}
                  color='primary'
                  size='small'
                  label={`${tag.value}`}
                  className={styles.tag}
                  variant='outlined'
                />
              ))}
          </Box>
        )}
        <CardActions disableSpacing>
          <CustomCardActions post={post} />
        </CardActions>
      </Card>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Внимание</DialogTitle>
        <DialogContent>
          <DialogContentText>Вы уверены, что хотите удалить статью навсегда?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            type='button'
            size='large'
            variant='outlined'
            onClick={() => setOpenDialog(false)}
          >
            Отмена
          </Button>
          <Button type='button' size='large' variant='contained' onClick={handleDelete}>
            Удалить
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
