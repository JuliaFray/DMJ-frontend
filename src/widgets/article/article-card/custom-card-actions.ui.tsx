import React, { useState } from 'react';

import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { ArrowDropDown, ArrowDropUp, DoubleArrow, Grade } from '@mui/icons-material';
import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import EyeIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import { Tooltip } from '@mui/material';
import IconButton from '@mui/material/IconButton';

import { useAppDispatch } from 'shared/hook';
import { getIsAuth, markPostFavorite, togglePostRating } from 'shared/model';
import { TArticle } from 'shared/types';

import styles from 'entities/article/article.module.scss';

export type ICardActions = {
  post: TArticle;
  isCard: boolean;
};

export const CustomCardActions: React.FC<ICardActions> = ({ post, isCard }) => {
  const isAuth = useSelector(getIsAuth);

  const [isFavorite, setIsFavorite] = useState(!!post.likes);
  const [rating, setRating] = useState(post.rating || 0);
  const [userRating, setUserRating] = useState(post.userRating || 0);

  const dispatch = useAppDispatch();

  const onClickFavorite = () => {
    setIsFavorite(!isFavorite);
    dispatch(markPostFavorite({ postId: post._id }));
  };

  const onClickRating = (val: number) => {
    setRating(rating + val);
    setUserRating(userRating + val);
    dispatch(togglePostRating({ postId: post._id, rating: userRating + val }));
  };

  return (
    <ul className={styles.postDetails}>
      {isAuth && (
        <li key='rating' className={styles.comment}>
          <IconButton
            disabled={userRating === -1}
            aria-label='up rating'
            onClick={() => onClickRating(-1)}
          >
            <ArrowDropDown
              style={{
                color: '#8d5676',
                opacity: userRating === -1 ? '0.4' : '1',
              }}
            />
          </IconButton>

          <span>{rating}</span>

          <IconButton
            disabled={userRating === 1}
            aria-label='down rating'
            onClick={() => onClickRating(1)}
          >
            <ArrowDropUp
              style={{
                color: '#039a9a',
                opacity: userRating === 1 ? '0.4' : '1',
              }}
            />
          </IconButton>
        </li>
      )}
      <li key='viewsCount'>
        <EyeIcon className={styles.comment} />
        <span className={styles.commentText}>{post.viewsCount}</span>
      </li>
      <li key='comments'>
        <CommentIcon className={styles.comment} />
        <span className={styles.commentText}>{post.comments?.length}</span>
      </li>

      {isAuth && (
        <li key='isFavorite'>
          <Tooltip title='В избранное'>
            <IconButton aria-label='add to favorites' onClick={onClickFavorite}>
              <Grade color={isFavorite ? 'secondary' : 'disabled'} />
            </IconButton>
          </Tooltip>
        </li>
      )}

      {isCard && (
        <li key='link'>
          <Link to={`/article/${post._id}`} style={{ position: 'absolute', right: '10px' }}>
            <Tooltip title='Читать далее'>
              <IconButton aria-label='forward'>
                <DoubleArrow style={{ fill: 'black' }} />
              </IconButton>
            </Tooltip>
          </Link>
        </li>
      )}
    </ul>
  );
};
