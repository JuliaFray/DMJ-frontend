import React, { useState } from 'react';

import {
  Avatar,
  Button,
  Card,
  Divider,
  Group,
  Modal,
  Paper,
  Stack,
  TextInput,
  Title,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { useChangeAvatarMutation } from 'shared/api';
import { useAuth } from 'shared/context';
import { useAppDispatch } from 'shared/hook';
import { profileActions } from 'shared/model';
import classes from 'shared/ui/user-card-modal/user-card-modal.module.css';
import { getAvatarSrc } from 'shared/utils';

export const AvatarSelection = () => {
  const { me } = useAuth();
  const user = me;

  const dispatch = useAppDispatch();

  const [opened, { open, close }] = useDisclosure(false);
  const [selected, setSelected] = useState<number>();

  const indexes = Array.from({ length: 10 }, (_, index) => index + 1);

  const handleSelectAvatar = (index: number) => {
    setSelected(index);
  };

  const [changeAvatar] = useChangeAvatarMutation();

  const handleSaveAvatar = () => {
    if (user && selected) {
      changeAvatar({ userId: user._id, avatarId: selected.toString() });
      dispatch(profileActions.changeAvatar(selected));
      close();
    }
  };

  return (
    <>
      <Stack gap='xl'>
        <Paper
          withBorder
          p='2.5rem'
          radius='lg'
          style={{ background: 'var(--orcha-panel)', borderColor: 'var(--orcha-border)' }}
        >
          <Stack gap='2.5rem'>
            <Group align='flex-start' gap='2rem'>
              <Avatar
                src={getAvatarSrc(user?.avatarId)}
                size={100}
                radius='xl'
                style={{ border: '2px solid rgba(147,51,234,0.3)' }}
              />
              <Stack gap='xs' style={{ flex: 1 }}>
                <Title order={3} size='1.5rem'>
                  Настройки профиля
                </Title>

                <Group mt='md'>
                  <Button onClick={open} variant='light' color='violet' size='xs' radius='md'>
                    Изменить аватар
                  </Button>
                  <Button variant='subtle' color='red' size='xs'>
                    Удалить аватар
                  </Button>
                </Group>
              </Stack>
            </Group>

            <Divider color='var(--orcha-border)' />

            <Stack gap='md'>
              <Group grow>
                <TextInput label='Логин' defaultValue={user?.login || ''} />
              </Group>
              <TextInput label='Email' defaultValue={user?.email || ''} disabled />
            </Stack>

            <Group justify='flex-end'>
              <Button color='violet' radius='md' size='md'>
                Сохранить изменения
              </Button>
            </Group>
          </Stack>
        </Paper>
      </Stack>
      <Modal zIndex={1000} opened={opened} onClose={close} title='Выберите Аватар' centered>
        <Card withBorder padding='xl' radius='md'>
          <Group gap='xl'>
            {[
              indexes.map((it) => (
                <Avatar
                  src={getAvatarSrc(it)}
                  size={80}
                  radius={80}
                  mx='auto'
                  className={classes.avatar}
                  style={it === selected ? { border: '4px solid var(--mantine-color-blue-6)' } : {}}
                  key={it}
                  alt={`avatar-${it}`}
                  onClick={() => handleSelectAvatar(it)}
                />
              )),
            ]}
          </Group>
          <Button
            onClick={handleSaveAvatar}
            fullWidth
            radius='md'
            mt='xl'
            size='md'
            variant='default'
          >
            Сохранить
          </Button>
        </Card>
      </Modal>
    </>
  );
};
