import React, { useState } from 'react';

import { useSelector } from 'react-redux';

import { ArrowDropDown, ArrowDropUp, Grade } from '@mui/icons-material';
import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import EyeIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import { BottomNavigation, BottomNavigationAction, Container, Tooltip } from '@mui/material';
import IconButton from '@mui/material/IconButton';

import { useAppDispatch } from 'shared/hook';
import { getIsAuth, markPostFavorite, togglePostRating } from 'shared/model';
import { TArticle } from 'shared/types';

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
    <BottomNavigation showLabels sx={{ width: '100%', justifyContent: 'space-between' }}>
      {isAuth && (
        <>
          <BottomNavigationAction
            onClick={() => onClickRating(-1)}
            disabled={userRating === -1}
            icon={
              <ArrowDropDown
                style={{
                  color: '#8d5676',
                  opacity: userRating === -1 ? '0.4' : '1',
                }}
              />
            }
          />

          <BottomNavigationAction showLabel label={rating.toString()} />

          <BottomNavigationAction
            onClick={() => onClickRating(1)}
            disabled={userRating === 1}
            icon={
              <ArrowDropUp
                style={{
                  color: '#039a9a',
                  opacity: userRating === 1 ? '0.4' : '1',
                }}
              />
            }
          />
        </>
      )}

      <BottomNavigationAction key='viewsCount' label={post.viewsCount} icon={<EyeIcon />} />

      <BottomNavigationAction key='comments' label={post.comments?.length} icon={<CommentIcon />} />
      <BottomNavigationAction
        showLabel
        key='isFavorite'
        label=' '
        icon={
          <Tooltip title='В избранное'>
            <IconButton aria-label='add to favorites' onClick={onClickFavorite}>
              <Grade color={isFavorite ? 'secondary' : 'disabled'} />
            </IconButton>
          </Tooltip>
        }
      />
    </BottomNavigation>
  );
};
