import React, { FC, ReactNode } from 'react';

import { CaretRightIcon } from '@phosphor-icons/react';

import { Group, Modal, Text, UnstyledButton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { IUser } from '../../types';
import { AvatarWithIndicator } from '../avatar-with-indicator';
import { UserCardModal } from '../user-card-modal';

import classes from './user-button.module.scss';

interface UserButtonProps {
  user: IUser;
  created?: string;
  onlyAvatar?: boolean;
  showAction?: boolean;
  size?: number;
  customActions?: ReactNode;
}

export const UserButton: FC<UserButtonProps> = ({
  user,
  created,
  onlyAvatar = false,
  showAction = true,
  size = 50,
  customActions,
}) => {
  const [opened, { open, close }] = useDisclosure(false);

  if (onlyAvatar) {
    return <AvatarWithIndicator avatarId={user.avatarId} profileId={user._id} size={size} />;
  }

  if (customActions) {
    return (
      <>
        <Group className={classes.user}>
          <Group>
            <AvatarWithIndicator avatarId={user.avatarId} profileId={user._id} size={size} />

            <div style={{ flex: 1 }}>
              <Text size='lg' fw={500}>
                {user.login}
              </Text>

              <Text c='dimmed' size='sm'>
                {user.email}
              </Text>

              {created && (
                <Text c='dimmed' size='xs'>
                  {created}
                </Text>
              )}
            </div>
            {customActions}
            {showAction && (
              <CaretRightIcon onClick={open} size={14} style={{ cursor: 'pointer' }} />
            )}
          </Group>
        </Group>

        <Modal zIndex={1000} opened={opened} onClose={close} centered>
          <UserCardModal user={user} close={close} />
        </Modal>
      </>
    );
  }

  return (
    <>
      <UnstyledButton className={classes.user} onClick={open}>
        <Group>
          <AvatarWithIndicator avatarId={user.avatarId} profileId={user._id} size={size} />

          <div style={{ flex: 1 }}>
            <Text size='lg' fw={500}>
              {user.login}
            </Text>

            <Text c='dimmed' size='sm'>
              {user.email}
            </Text>

            {created && (
              <Text c='dimmed' size='xs'>
                {created}
              </Text>
            )}
          </div>
          {customActions}
          {showAction && <CaretRightIcon size={14} />}
        </Group>
      </UnstyledButton>

      <Modal zIndex={1000} opened={opened} onClose={close} centered>
        <UserCardModal user={user} close={close} />
      </Modal>
    </>
  );
};
