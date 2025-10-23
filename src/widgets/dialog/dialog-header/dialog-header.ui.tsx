import React from 'react';

import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { AvatarGroup, Box, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';

import { styles } from 'pages/dialogs';

import { useAppSelector } from 'shared/hook';
import { getFullName, getImage } from 'shared/lib';
import { authSelector } from 'shared/model';
import { TDialog } from 'shared/types';

type IDialogHeader = {
  selectedDialog: TDialog;
};

export const DialogHeader: React.FC<IDialogHeader> = ({ selectedDialog }) => {
  const authId = useAppSelector(authSelector.getAuthId);
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/dialogs');
  };

  if (!selectedDialog.users) {
    return null;
  }

  if (selectedDialog.isPrivate) {
    const to = selectedDialog.users.find((u) => u._id !== authId);
    if (!to) {
      return null;
    }
    return (
      <Box
        sx={{
          overflow: 'hidden',
          position: 'absolute',
          top: '0',
          left: '0',
          width: '100%',
        }}
        className={styles.default.dialogHeader}
      >
        <div className={styles.default.dialogHeaderInfo}>
          <IconButton
            className={styles.default.btn}
            type='submit'
            color='primary'
            onClick={handleBack}
          >
            <ArrowBackIosIcon />
          </IconButton>
          <Avatar key={uuidv4()} alt={getFullName(to)} src={getImage(to.avatar, true)} />
          <Typography key={uuidv4()} className={styles.default.author} noWrap>
            {getFullName(to)}
          </Typography>
        </div>
        <Divider sx={{ marginBottom: '20px' }} />
      </Box>
    );
  }

  return (
    <Box sx={{ overflow: 'hidden', px: 3 }} className={styles.default.dialogHeader}>
      <div className={styles.default.dialogHeaderInfo}>
        <IconButton
          className={styles.default.btn}
          type='submit'
          color='primary'
          onClick={handleBack}
        >
          <ArrowBackIosIcon />
        </IconButton>
        <AvatarGroup max={5}>
          {selectedDialog.users
            .filter((u) => u._id !== authId)
            .map((user) => (
              <Avatar key={uuidv4()} alt={getFullName(user)} src={getImage(user.avatar, true)} />
            ))}
        </AvatarGroup>
      </div>
      <Divider sx={{ marginBottom: '20px' }} />
    </Box>
  );
};
