import React, { FC, useContext, useState } from 'react';

import moment from 'moment/moment';
import { Link } from 'react-router-dom';

import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material';
import { Box, Paper, Tooltip } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

import { ProfileContext } from 'shared/context';
import { useAppDispatch } from 'shared/hook';
import { getFullName, NO_AVATAR, pathKeys } from 'shared/lib';
import { toggleCommentRating } from 'shared/model';
import { IComment } from 'shared/types';

import styles from './comment.module.scss';

interface CommentProps {
  item: IComment;
  isLoading: boolean;
}

export const Comment: FC<CommentProps> = ({ item, isLoading }) => {
  const dispatch = useAppDispatch();
  const { isAuth } = useContext(ProfileContext);

  const [rating, setRating] = useState(item?.rating || 0);
  const [userRating, setUserRating] = useState(item?.userRating || 0);

  if (!item) {
    return null;
  }

  const onClickRating = (val: number) => {
    setRating(rating + val);
    setUserRating(userRating + val);
    if (item._id) {
      dispatch(toggleCommentRating({ commentId: item._id, rating: userRating + val }));
    }
  };

  return (
    <Paper key={item._id}>
      <ListItem
        alignItems='flex-start'
        sx={{ width: '100%' }}
        style={{
          marginBottom: '10px',
        }}
      >
        <ListItemAvatar>
          {isLoading ? (
            <Skeleton variant='circular' width={40} height={40} />
          ) : (
            <Avatar
              alt={item.userId?.login ?? 'login'}
              src={
                (item.userId?.avatar && `data:image/jpeg;base64,${item.userId?.avatar.data}`) ||
                NO_AVATAR
              }
            />
          )}
        </ListItemAvatar>

        {(isLoading || !item.userId) && (
          <Box style={{ display: 'flex', flexDirection: 'column' }}>
            <Skeleton variant='text' height={25} width={120} />
            <Skeleton variant='text' height={18} width={230} />
          </Box>
        )}

        {!isLoading && !!item.userId && (
          <ListItemText secondary={item.text}>
            <Link className={styles.name} to={pathKeys.user.byId({ id: item.userId._id })}>
              {getFullName(item.userId)}
            </Link>
          </ListItemText>
        )}

        <Stack spacing={1} direction='column'>
          <>
            <Tooltip
              className={styles.additional}
              title={moment(item.createdAt).locale('ru').format('DD.MM.YYYY HH:mm')}
            >
              <span>{moment(item.createdAt).locale('ru').fromNow()}</span>
            </Tooltip>

            {isAuth && (
              <Stack spacing={1} direction='row'>
                <Box>
                  <IconButton
                    key='up rating'
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
                    key='down rating'
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
                </Box>
              </Stack>
            )}
          </>
        </Stack>
      </ListItem>
    </Paper>
  );
};
