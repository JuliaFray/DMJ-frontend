import React from 'react';

import clsx from 'clsx';
import ReactMarkdown from 'react-markdown';
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { Delete } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import TagIcon from '@mui/icons-material/Tag';
import { Box, Chip, Tooltip } from '@mui/material';
import IconButton from '@mui/material/IconButton';

import { useAppDispatch } from 'shared/hook';
import { getFullName, getImage, hasImage } from 'shared/lib';
import { deletePost } from 'shared/model';
import { TArticle, TChipData } from 'shared/types';

import { ArticleSkeleton } from 'entities/article';

import { CustomCardActions, UserInfo } from 'widgets';

import styles from './article.module.scss';

export type PostPropsType = {
  post: TArticle;
  isFullPost: boolean;
  isLoading: boolean;
  isEditable: boolean;
};

export const Article: React.FC<PostPropsType> = ({ post, isFullPost, isLoading, isEditable }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onClickRemove = () => {
    // eslint-disable-next-line no-alert
    if (window.confirm('Вы действительно хотите удалить статью?')) {
      dispatch(deletePost({ payload: post }));
      navigate('/');
    }
  };

  if (isLoading) {
    return <ArticleSkeleton />;
  }

  return (
    <div className={clsx(styles.root, { [styles.rootFull]: isFullPost })}>
      {isEditable && (
        <div className={styles.editButtons}>
          <Link to={`/editor/${post._id}`}>
            <Tooltip title='Редактировать'>
              <IconButton color='primary'>
                <EditIcon />
              </IconButton>
            </Tooltip>
          </Link>
          <IconButton onClick={onClickRemove} color='error'>
            <Tooltip title='Удалить'>
              <Delete />
            </Tooltip>
          </IconButton>
        </div>
      )}

      {hasImage(post.image) && (
        <img alt='postImage' className={styles.image} src={getImage(post.image)} />
      )}

      <div className={styles.wrapper}>
        <UserInfo
          avatar={getImage(post.author.avatar, true)}
          fullName={getFullName(post.author)}
          additionalText={post.createdAt}
          userId={post.author._id}
        />
        <div>
          <h2 className={clsx(styles.title, { [styles.titleFull]: isFullPost })}>
            {isFullPost ? (
              post.title
            ) : (
              <Link key={post._id} to={`/${post._id}`}>
                {post.title}
              </Link>
            )}
          </h2>

          {!!post.tags?.length && (
            <Box className={styles.tags}>
              {post.tags.length &&
                post.tags.map((tag: TChipData) => (
                  <Chip
                    key={uuidv4()}
                    color='secondary'
                    icon={<TagIcon className={styles.icon} />}
                    size='small'
                    label={`${tag.value}`}
                    className={styles.tag}
                    variant='outlined'
                  />
                ))}
            </Box>
          )}

          <ReactMarkdown className={clsx(styles.text)}>{post.text}</ReactMarkdown>

          <CustomCardActions post={post} isCard={false} />
        </div>
      </div>
    </div>
  );
};
