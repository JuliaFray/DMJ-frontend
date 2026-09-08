import React, { FC, useCallback, useEffect } from 'react';

import { Form, Formik } from 'formik';
import { useParams } from 'react-router-dom';

import {
  Button,
  Container,
  Grid,
  Group,
  LoadingOverlay,
  Modal,
  Paper,
  Text,
  Title,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { DietParams, DietPlanComposition } from 'widgets/diet';

import {
  useDeleteDietPlanMutation,
  useGetOneDietPlanQuery,
  useUpdateDietPlanMutation,
} from 'shared/api';
import { useWebSocket } from 'shared/context';
import { useAppDispatch, useAppSelector, useMedia } from 'shared/hook';
import { SocketEvents } from 'shared/lib';
import { dietActions, dietSelector } from 'shared/model';
import { IDietPlan, Nullable } from 'shared/types';

export const DietPlanPage: FC = () => {
  const { mdMain } = useMedia();
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const [opened, { toggle, close }] = useDisclosure(false);

  const ws = useWebSocket();

  const handleWS = useCallback(
    (e: MessageEvent<string>) => {
      const { type, data } = JSON.parse(e.data);
      if (type === SocketEvents.CHANGE_WEIGHT_EVENT) {
        dispatch(dietActions.updateDietPlan(data));
      }
    },
    [dispatch],
  );

  useEffect(() => {
    if (!ws) return;

    ws.addEventListener('message', handleWS);
    return () => ws.removeEventListener('message', handleWS);
  }, [handleWS, ws]);

  const { isLoading } = useGetOneDietPlanQuery({ id: id! });
  const [updateDiet, { isLoading: isUpdateLoading }] = useUpdateDietPlanMutation();
  const [deleteDiet] = useDeleteDietPlanMutation();

  const diet: Nullable<IDietPlan> = useAppSelector(dietSelector.getDiet);

  const handleDelete = () => {
    close();
    deleteDiet({ id: id! });
  };

  if (!diet) {
    return null;
  }

  return (
    <Grid>
      <Grid.Col span={mdMain}>
        <Paper withBorder radius='md' p='xs'>
          <Container pos='relative'>
            <LoadingOverlay
              visible={isLoading || isUpdateLoading}
              zIndex={1000}
              overlayProps={{ radius: 'sm', blur: 2 }}
              loaderProps={{ color: 'teal', type: 'bars' }}
            />
            <Formik
              initialValues={{ ...diet }}
              onSubmit={(v) => {
                updateDiet({ id: id!, body: v as IDietPlan });
              }}
              enableReinitialize
            >
              {() => (
                <Form>
                  <Title mb='md' order={3}>
                    Основные параметры
                  </Title>
                  <DietParams />

                  <Group wrap='nowrap' justify='flex-end'>
                    <Button radius='md' mt='xl' size='md' variant='default' onClick={toggle}>
                      Удалить план
                    </Button>

                    <Button radius='md' mt='xl' size='md' variant='filled' type='submit'>
                      Сохранить
                    </Button>
                  </Group>

                  <Title mb='md' order={3}>
                    Состав
                  </Title>
                  <DietPlanComposition diet={diet} />
                </Form>
              )}
            </Formik>
          </Container>
        </Paper>

        <Modal opened={opened} withCloseButton size='lg' onClose={close} centered title='Внимание'>
          <Text size='sm' mb='xs' fw={500}>
            Вы уверены, что хотите удалить план питания навсегда?
          </Text>

          <Group justify='flex-end' mt='lg'>
            <Button size='compact-lg' variant='default' onClick={close}>
              Отмена
            </Button>
            <Button size='compact-lg' variant='filled' onClick={handleDelete}>
              Удалить
            </Button>
          </Group>
        </Modal>
      </Grid.Col>
    </Grid>
  );
};
