import React, { useState } from 'react';

import { PaperPlaneRightIcon } from '@phosphor-icons/react';

import { ActionIcon, Group, Paper, TextInput } from '@mantine/core';

import { styles } from 'entities/comment';

import { useCreatePostCommentMutation } from 'shared/api';
import { useAuth } from 'shared/context';
import { UserButton } from 'shared/ui';

export type ICommentCreate = {
  postId: string;
};

export const CreateComment: React.FC<ICommentCreate> = ({ postId }) => {
  const { me } = useAuth();
  const [value, setValue] = useState<string>('');

  const [createPostComment] = useCreatePostCommentMutation();
  const onSubmit = () => {
    if (value.trim()) {
      createPostComment({
        comment: {
          text: value.trim(),
        },
        postId,
      });
      setValue('');
    }
  };

  return (
    <Paper withBorder radius='md' className={styles.default.comment}>
      <Group
        style={{ alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'nowrap' }}
      >
        {me && <UserButton user={me} onlyAvatar />}
        <TextInput
          value={value}
          onChange={(event) => setValue(event.currentTarget.value)}
          style={{ width: '100%' }}
        />

        <ActionIcon variant='filled' size='input-sm' onClick={onSubmit}>
          <PaperPlaneRightIcon />
        </ActionIcon>
      </Group>
    </Paper>
  );
};
