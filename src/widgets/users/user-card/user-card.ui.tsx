import React, { useState } from 'react';

import { Form, Formik, useFormik } from 'formik';

import { Button, Container, Group, Modal, Paper } from '@mantine/core';

import { useAuth, useWebSocket } from 'shared/context';
import { useAppDispatch } from 'shared/hook';
import { getFullName, SocketEvents } from 'shared/lib';
import { toggleFollowProfile } from 'shared/model';
import { IUser } from 'shared/types';
import { InputWrapper, UserButton } from 'shared/ui';

type TProfileMain = {
  profile: IUser;
};

export const UserCard: React.FC<TProfileMain> = ({ profile }) => {
  const { authId } = useAuth();

  const [isFollowed, setIsFollowed] = useState(profile.isFollowed);
  const [open, setOpen] = React.useState(false);

  const ws = useWebSocket();
  const dispatch = useAppDispatch();

  const handleClose = () => {
    setOpen(false);
  };

  const handleFollowClick = () => {
    setIsFollowed(!isFollowed);
    if (authId) {
      dispatch(
        toggleFollowProfile({
          profileId: authId,
          query: `?userId=${profile._id}&isFollow=${!isFollowed}`,
          userId: profile._id,
        }),
      );
    }
  };

  const onSubmit = (data: { text: string }) => {
    if (data.text.trim()) {
      const msg = {
        type: SocketEvents.MSG_EVENT,
        from: authId,
        to: profile._id,
        text: data.text,
        dialogId: null,
      };
      ws?.send(JSON.stringify({ type: SocketEvents.MSG_EVENT, msg }));

      handleClose();
    }
  };

  const formikConfig = useFormik({
    initialValues: { text: '' } as { text: string },
    onSubmit: (text) => onSubmit(text),
    enableReinitialize: true,
  });

  const isNotMe = authId !== profile._id;

  return (
    <Paper withBorder radius='md' p={20}>
      <UserButton user={profile} showAction={false} size={94} />

      {isNotMe && (
        <Group wrap='nowrap' justify='center'>
          <Button
            fullWidth
            radius='md'
            mt='xl'
            size='md'
            variant='default'
            onClick={() => setOpen(true)}
          >
            Сообщение
          </Button>

          <Button
            onClick={handleFollowClick}
            fullWidth
            radius='md'
            mt='xl'
            size='md'
            variant='default'
          >
            {isFollowed ? 'Отписаться' : 'Подписаться'}
          </Button>
        </Group>
      )}
      <Container />

      <Modal opened={open} onClose={handleClose} centered title={getFullName(profile)}>
        <Formik onSubmit={onSubmit} {...formikConfig}>
          <Form>
            <InputWrapper label='Сообщение' name='text' placeholder='Введите сообщение...' />
          </Form>
        </Formik>

        <Group wrap='nowrap' justify='center'>
          <Button fullWidth radius='md' mt='xl' size='md' variant='default' onClick={handleClose}>
            Отмена
          </Button>

          <Button fullWidth radius='md' mt='xl' size='md' variant='filled' type='submit'>
            Отправить
          </Button>
        </Group>
      </Modal>
    </Paper>
  );
};
