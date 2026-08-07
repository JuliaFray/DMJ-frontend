import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';

import { Form, Formik } from 'formik';
import { useParams } from 'react-router-dom';

import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Paper,
  Tab,
  Tabs,
} from '@mui/material';
import DialogContentText from '@mui/material/DialogContentText';

import { DietPlanComposition, DietParams } from 'widgets/diet';

import { useDeleteDietMutation, useGetOneDietQuery, useUpdateDietMutation } from 'shared/api';
import {
  useAppDispatch,
  useAppSelector,
  useMedia,
  useQueryParams,
  useSetTabToQuery,
  useWebSocket,
} from 'shared/hook';
import { SocketEvents } from 'shared/lib';
import { dietActions, dietSelector } from 'shared/model';
import { IDietPlan } from 'shared/types';
import { Spinner, TabPanel } from 'shared/ui';
import { a11yProps } from 'shared/utils';

// eslint-disable-next-line no-shadow
enum DIET_TABS {
  DIET_PARAMS = 'params',
  DIET_COMPOSITION = 'composition',
}

export const DietPlanPage: FC = () => {
  const { mdMain } = useMedia();
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const [openDialog, setOpenDialog] = useState(false);

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

  const { isLoading } = useGetOneDietQuery({ id: id! });
  const [updateDiet, { isLoading: isUpdateLoading }] = useUpdateDietMutation();
  const [deleteDiet] = useDeleteDietMutation();

  const diet: IDietPlan | null = useAppSelector(dietSelector.getDiet);

  const handleDelete = () => {
    setOpenDialog(false);
    deleteDiet({ id: id! });
  };

  const handleTabChange =
    (formValues: IDietPlan) => (event: React.SyntheticEvent, newValue: string) => {
      const tab = Object.values(DIET_TABS)[newValue];
      setTabIndex(tab);
      updateDiet({ id: id!, body: formValues });
      setQueryParams({ diet: tab });
    };

  if (!diet || isLoading || isUpdateLoading) {
    return <Spinner display />;
  }

  return (
    <Grid container spacing={2} width='100%' style={{ margin: 0, padding: 0 }}>
      <Grid item md={mdMain} width='100%' style={{ margin: 0, padding: 0 }}>
        <Paper variant='elevation' elevation={4} sx={{ padding: '16px' }}>
          <Container sx={{ padding: '0!important' }}>
            <Formik
              initialValues={diet}
              onSubmit={(v) => {
                updateDiet({ id: id!, body: v });
              }}
              enableReinitialize
            >
              {({ values }) => (
                <>
                  <Tabs
                    value={tabIndex}
                    onChange={handleTabChange(values)}
                    centered
                    variant='fullWidth'
                  >
                    <Tab wrapped label='Основные параметры' {...a11yProps(DIET_TABS.DIET_PARAMS)} />
                    <Tab wrapped label='Состав' {...a11yProps(DIET_TABS.DIET_COMPOSITION)} />
                    {/* <Tab wrapped label='Итог' {...a11yProps(2)} /> */}
                  </Tabs>

                  <Form style={{ display: `${isLoading || isUpdateLoading ? 'none' : 'block'}` }}>
                    <TabPanel value={tabIndex} index={DIET_TABS.DIET_PARAMS}>
                      <DietParams diet={diet} />
                    </TabPanel>
                    <TabPanel value={tabIndex} index={DIET_TABS.DIET_COMPOSITION}>
                      <DietPlanComposition diet={diet} />
                    </TabPanel>

                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'end',
                        gap: '20px',
                        marginTop: '24px',
                      }}
                    >
                      <Button
                        type='button'
                        size='large'
                        variant='outlined'
                        onClick={() => setOpenDialog(true)}
                      >
                        Удалить
                      </Button>
                      <Button type='submit' size='large' variant='contained'>
                        Сохранить
                      </Button>
                    </Box>
                  </Form>
                </>
              )}
            </Formik>
          </Container>
        </Paper>

        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>Внимание</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Вы уверены, что хотите удалить план питания навсегда?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              type='button'
              size='large'
              variant='outlined'
              onClick={() => setOpenDialog(false)}
            >
              Отмена
            </Button>
            <Button type='button' size='large' variant='contained' onClick={handleDelete}>
              Удалить
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </Grid>
  );
};
