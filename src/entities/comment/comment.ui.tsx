import React, { useState } from 'react';

import moment from 'moment/moment';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material';
import { Box, Tooltip } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

import { useAppDispatch, useAppSelector } from 'shared/hook';
import { getFullName, NO_AVATAR } from 'shared/lib';
import { getIsAuth, toggleCommentRating } from 'shared/model';
import { theme } from 'shared/themes';
import { TCommentType } from 'shared/types';

import styles from './comment.module.scss';

export const Comment: React.FC<TCommentType> = ({ item, isLoading }) => {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(getIsAuth);

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
    <React.Fragment key={uuidv4()}>
      <ListItem
        alignItems='flex-start'
        sx={{ width: '100%' }}
        style={{
          backgroundColor: theme.palette.secondary.main,
          borderRadius: '15px',
          marginBottom: '10px',
        }}
      >
        <ListItemAvatar key={uuidv4()}>
          {isLoading ? (
            <Skeleton key={uuidv4()} variant='circular' width={40} height={40} />
          ) : (
            <Avatar
              key={uuidv4()}
              alt={item.author?.firstName ?? 'firstName'}
              src={
                (item.author?.avatar && `data:image/jpeg;base64,${item.author?.avatar.data}`) ||
                NO_AVATAR
              }
            />
          )}
        </ListItemAvatar>
        {isLoading || !item.author ? (
          <div key={uuidv4()} style={{ display: 'flex', flexDirection: 'column' }}>
            <Skeleton key={uuidv4()} variant='text' height={25} width={120} />
            <Skeleton key={uuidv4()} variant='text' height={18} width={230} />
          </div>
        ) : (
          <ListItemText key={uuidv4()} secondary={item.text}>
            <Link key={uuidv4()} className={styles.name} to={`/user/${item.author._id}`}>
              {getFullName(item.author)}
            </Link>
          </ListItemText>
        )}

        <Stack key={uuidv4()} spacing={1} direction='column'>
          <>
            <Tooltip
              className={styles.additional}
              title={moment(item.createdAt).locale('ru').format('DD.MM.YYYY HH:mm')}
            >
              <span key={uuidv4()}>{moment(item.createdAt).locale('ru').fromNow()}</span>
            </Tooltip>

            {isAuth && (
              <Stack key={uuidv4()} spacing={1} direction='row'>
                <Box key={uuidv4()}>
                  <IconButton
                    key={uuidv4()}
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

                  <span key={uuidv4()}>{rating}</span>

                  <IconButton
                    key={uuidv4()}
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
    </React.Fragment>
  );
};
