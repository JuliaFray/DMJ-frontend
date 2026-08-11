import React from 'react';

import { FieldValues, useForm } from 'react-hook-form';

import SendIcon from '@mui/icons-material/Send';
import { Paper } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';

import { styles } from 'entities/comment';

import { useCreatePostCommentMutation } from 'shared/api';

export type ICommentCreate = {
  postId: string;
};

export const CreateComment: React.FC<ICommentCreate> = ({ postId }) => {
  const { register, handleSubmit, resetField } = useForm({
    mode: 'onChange',
  });
  const [createPostComment] = useCreatePostCommentMutation();
  const onSubmit = (formData: FieldValues) => {
    createPostComment({
      comment: {
        text: formData.text,
      },
      postId,
    });
    resetField('text');
  };

  return (
    <Paper className={styles.default.root}>
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
    </Paper>
  );
};
