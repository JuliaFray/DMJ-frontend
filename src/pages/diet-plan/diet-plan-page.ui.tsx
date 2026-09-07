import React, { FC, useCallback, useEffect, useState } from 'react';

import { Form, Formik } from 'formik';
import { useParams } from 'react-router-dom';

import { Button, Container, Grid, Group, Modal, Paper, Text, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { DietParams, DietPlanComposition } from 'widgets/diet';

import {
  useDeleteDietPlanMutation,
  useGetOneDietPlanQuery,
  useUpdateDietPlanMutation,
} from 'shared/api';
import { useWebSocket } from 'shared/context';
import {
  useAppDispatch,
  useAppSelector,
  useMedia,
  useQueryParams,
  useSetTabToQuery,
} from 'shared/hook';
import { SocketEvents } from 'shared/lib';
import { dietActions, dietSelector } from 'shared/model';
import { IDietPlan, Nullable } from 'shared/types';
import { Spinner } from 'shared/ui';

// eslint-disable-next-line no-shadow
enum DIET_TABS {
  DIET_PARAMS = 'params',
  DIET_COMPOSITION = 'composition',
}

export const DietPlanPage: FC = () => {
  const { mdMain } = useMedia();
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const [opened, { toggle, close }] = useDisclosure(false);

  const [tabIndex, setTabIndex] = useState<string>(DIET_TABS.DIET_PARAMS);

  const { queryParams, setQueryParams } = useQueryParams();

  useSetTabToQuery([
    {
      setter: setTabIndex,
      queryParams: queryParams.diet as string,
      additional: DIET_TABS.DIET_PARAMS,
    },
  ]);

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

  const diet: IDietPlan | null = useAppSelector(dietSelector.getDiet);

  const handleDelete = () => {
    close();
    deleteDiet({ id: id! });
  };

  const handleTabChange = (formValues: IDietPlan) => (newValue: Nullable<string>) => {
    if (newValue) {
      const tab = Object.values(DIET_TABS)[newValue];
      setTabIndex(tab);
      updateDiet({ id: id!, body: formValues });
      setQueryParams({ diet: tab });
    }
  };

  if (!diet || isLoading || isUpdateLoading) {
    return <Spinner display />;
  }

  return (
    <Grid style={{ margin: 0, padding: 0 }}>
      <Grid.Col span={mdMain} style={{ margin: 0, padding: 0 }}>
        <Paper withBorder radius='md' p='xs'>
          <Container>
            <Formik
              initialValues={diet}
              onSubmit={(v) => {
                updateDiet({ id: id!, body: v });
              }}
              enableReinitialize
            >
              {() => (
                <Form style={{ display: `${isLoading || isUpdateLoading ? 'none' : 'block'}` }}>
                  <Title mb='md' order={3}>
                    Основные параметры
                  </Title>
                  <DietParams />

                  <Group justify='flex-end' mb='lg'>
                    <Button size='compact-lg' variant='outline' onClick={toggle}>
                      Удалить план
                    </Button>
                    <Button type='submit' size='compact-lg' variant='filled'>
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
            <Button size='compact-lg' variant='outline' onClick={close}>
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
