import React, { FC } from 'react';

import { CaretRightIcon } from '@phosphor-icons/react';

import { Avatar, Group, Modal, Text, UnstyledButton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { getAvatarSrc } from 'shared/utils';

import { IUser } from '../../types';
import { UserCardModal } from '../user-card-modal';

import classes from './user-button.module.css';

interface UserButtonProps {
  user: IUser;
  created?: string;
}

export const UserButton: FC<UserButtonProps> = ({ user, created }) => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <UnstyledButton className={classes.user} onClick={open}>
        <Group>
          <Avatar src={getAvatarSrc(user.avatarId)} radius='xl' alt={user.login} />

          <div style={{ flex: 1 }}>
            <Text size='sm' fw={500}>
              {user.login}
            </Text>

            <Text c='dimmed' size='xs'>
              {user.email}
            </Text>

            {created && (
              <Text c='dimmed' size='xs'>
                {created}
              </Text>
            )}
          </div>

          <CaretRightIcon size={14} />
        </Group>
      </UnstyledButton>

      <Modal zIndex={1000} opened={opened} onClose={close} centered>
        <UserCardModal user={user} />
      </Modal>
    </>
  );
};
