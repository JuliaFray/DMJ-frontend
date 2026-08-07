import React, { useContext } from 'react';

import { useForm } from 'react-hook-form';

import SendIcon from '@mui/icons-material/Send';
import { Box } from '@mui/material';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';

import { ProfileContext } from 'shared/context';
import { useWebSocket } from 'shared/hook';
import { SocketEvents } from 'shared/lib';
import { IDialog } from 'shared/types';

import styles from './SendMsg.module.scss';

type ISendMsg = {
  selectedDialog: IDialog;
};

export const SendMsg: React.FC<ISendMsg> = (props) => {
  const { authId } = useContext(ProfileContext);
  const ws = useWebSocket();

  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm({
    defaultValues: { text: '' },
    mode: 'onChange',
  });

  const onSubmit = (text: string) => {
    props.selectedDialog.users
      .filter((u) => u._id !== authId)
      .forEach((u) => {
        const msg = {
          type: SocketEvents.MSG_EVENT,
          from: authId,
          to: u._id,
          text,
          dialogId: props.selectedDialog._id,
        };
        ws?.send(JSON.stringify({ type: SocketEvents.MSG_EVENT, msg }));
      });

    resetField('text');
  };

  return (
    <Box className={styles.sendMsg}>
      <Divider sx={{ marginBottom: '20px' }} />

      <form
        className={styles.sendForm}
        onSubmit={handleSubmit((values: { text: string }) => onSubmit(values.text))}
      >
        <TextField
          variant='outlined'
          className={styles.field}
          placeholder='Введите сообщение'
          fullWidth
          error={Boolean(errors.text?.message)}
          helperText={errors.text?.message}
          {...register('text', { maxLength: 100 })}
        />

        <IconButton className={styles.btn} type='submit' color='primary'>
          <SendIcon />
        </IconButton>
      </form>
    </Box>
  );
};
