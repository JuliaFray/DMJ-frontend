import React from 'react';

import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';

import { useAuth } from 'shared/context';
import { useAppDispatch, useAppSelector } from 'shared/hook';
import { getFullName, getImage } from 'shared/lib';
import { dialogActions, dialogSelector } from 'shared/model';
import { IDialog } from 'shared/types';

const DialogItems: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { authId } = useAuth();

  const items = useAppSelector(dialogSelector.getDialogs);

  const onDialogSelect = (item: IDialog) => {
    dispatch(dialogActions.addSelectedDialog(item));
    navigate(`/dialogs/${item._id}`);
  };

  return (
    <List key={uuidv4()} sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {items.map((item: IDialog) => {
        // const users = item.isPrivate ? item.users.filter((u) => u._id !== authId) : item.users;
        const user =
          item.lastMsg.fromUserId.userId === authId
            ? item.lastMsg.fromUserId
            : item.lastMsg.toUserId;
        return (
          <ListItem alignItems='flex-start'>
            <ListItemButton key={uuidv4()} onClick={() => onDialogSelect(item)}>
              <ListItemAvatar>
                <Avatar key={uuidv4()} alt={getFullName(user)} src={getImage(user.avatar, true)} />
              </ListItemAvatar>
              <ListItemText
                primary={`${user.login}`}
                secondary={
                  <>
                    <Typography
                      component='span'
                      variant='body2'
                      sx={{ color: 'text.primary', display: 'inline' }}
                    />
                    {item.lastMsg.text}
                  </>
                }
              />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
};

export default DialogItems;
