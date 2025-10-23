import React from 'react';

import { Divider, ListItem, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';

import { useAppSelector } from 'shared/hook';
import { dialogSelector } from 'shared/model';
import { TDialogFriends } from 'shared/types';

const DialogFriends: React.FC = () => {
  const users = useAppSelector(dialogSelector.getDialogUsers);

  return (
    <List sx={{ width: '100%', maxWidth: 360 }}>
      Участники
      {users.map((item: TDialogFriends) => {
        return (
          <>
            <ListItem alignItems='flex-start'>
              <ListItemAvatar>
                <Avatar alt={item.name} src={item.avatar} />
              </ListItemAvatar>
              <ListItemText
                primary={item.name}
                secondary={
                  <Typography
                    sx={{ display: 'inline' }}
                    component='span'
                    variant='body2'
                    color='text.primary'
                  />
                }
              />
            </ListItem>
            <Divider variant='inset' component='li' />
          </>
        );
      })}
    </List>
  );
};

export default DialogFriends;
