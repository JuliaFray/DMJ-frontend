import React from 'react';

import { FieldValues, useForm } from 'react-hook-form';

import SendIcon from '@mui/icons-material/Send';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';

import { useAppDispatch, useAppSelector } from 'shared/hook';
import { NO_AVATAR } from 'shared/lib';
import { createPostComment, getMyProfileAvatar, getMyProfileFullName } from 'shared/model';

import { styles } from 'entities/comment';

export type ICommentCreate = {
  postId: string;
};

export const CreateComment: React.FC<ICommentCreate> = ({ postId }) => {
  const dispatch = useAppDispatch();

  const { register, handleSubmit, resetField } = useForm({
    mode: 'onChange',
  });

  const avatar = useAppSelector(getMyProfileAvatar);
  const fullName = useAppSelector(getMyProfileFullName);

  const onSubmit = (formData: FieldValues) => {
    dispatch(
      createPostComment({
        comment: {
          text: formData.text,
        },
        postId,
      }),
    );
    resetField('text');
  };

  return (
    <div className={styles.default.root}>
      <Avatar
        className={styles.default.avatar}
        src={(avatar && `data:image/jpeg;base64,${avatar.data}`) || NO_AVATAR}
        alt={fullName}
      />
      <form className={styles.default.form} onSubmit={handleSubmit((values) => onSubmit(values))}>
        <TextField
          label='Написать комментарий'
          variant='outlined'
          maxRows={10}
          multiline
          fullWidth
          {...register('text')}
        />
        <IconButton className={styles.default.btn} type='submit' color='primary'>
          <SendIcon />
        </IconButton>
      </form>
    </div>
  );
};
