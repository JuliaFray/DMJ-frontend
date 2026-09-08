import React, { useState } from 'react';

import { Form, Formik, useFormikContext } from 'formik';

import { Avatar, Button, Card, Divider, Group, Modal, Paper, Stack, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { useChangeAvatarMutation } from 'shared/api';
import { useAppDispatch } from 'shared/hook';
import { profileActions } from 'shared/model';
import { IUserWithTargets } from 'shared/types';
import { InputWrapper } from 'shared/ui';
import classes from 'shared/ui/user-card-modal/user-card-modal.module.scss';
import { getAvatarSrc } from 'shared/utils';

export const AvatarSelection = () => {
  const { values } = useFormikContext<IUserWithTargets>();

  const dispatch = useAppDispatch();

  const [opened, { open, close }] = useDisclosure(false);
  const [selected, setSelected] = useState<number>();

  const indexes = Array.from({ length: 10 }, (_, index) => index + 1);

  const handleSelectAvatar = (index: number) => {
    setSelected(index);
  };

  const [changeAvatar] = useChangeAvatarMutation();

  const handleSaveAvatar = () => {
    if (values && selected) {
      changeAvatar({ userId: values._id, avatarId: selected.toString() });
      dispatch(profileActions.changeAvatar(selected));
      close();
    }
  };

  return (
    <>
      <Stack gap='xl'>
        <Paper p='0.5rem' style={{ background: 'var(--orcha-panel)' }}>
          <Stack gap='0.5rem'>
            <Group align='flex-start' gap='1rem'>
              <Avatar
                src={getAvatarSrc(values?.avatarId)}
                size={100}
                radius='xl'
                style={{ border: '2px solid rgba(147,51,234,0.3)' }}
              />
              <Stack gap='xs' style={{ flex: 1 }}>
                <Title order={3} size='1.5rem'>
                  Настройки профиля
                </Title>

                <Group mt='md'>
                  <Button
                    onClick={open}
                    variant='light'
                    color='violet'
                    size='compact-md'
                    radius='md'
                  >
                    Изменить аватар
                  </Button>
                  <Button variant='subtle' color='red' size='compact-md'>
                    Удалить аватар
                  </Button>
                </Group>
              </Stack>
            </Group>

            <Divider color='var(--orcha-border)' />
            <Formik
              initialValues={{ login: values?.login || '', email: values?.email || '' }}
              onSubmit={(data) => console.log(data)}
              enableReinitialize
            >
              {() => (
                <Form>
                  <Stack gap='sm'>
                    <InputWrapper name='login' label='Логин' />
                    <InputWrapper name='email' label='Email' disabled />
                  </Stack>

                  <Group justify='flex-end'>
                    <Button color='violet' radius='md' size='md'>
                      Сохранить изменения
                    </Button>
                  </Group>
                </Form>
              )}
            </Formik>
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
