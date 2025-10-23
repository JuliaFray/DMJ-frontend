import React, { FC, useCallback, useEffect, useState } from 'react';

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

import { DietConsist, DietParams } from 'widgets/diet';

import { useDeleteDietMutation, useGetOneDietQuery, useUpdateDietMutation } from 'shared/api';
import { useAppDispatch, useAppSelector, useMedia, useWebSocket } from 'shared/hook';
import { SocketEvents } from 'shared/lib';
import { dietActions, dietSelector } from 'shared/model';
import { TDietPlan } from 'shared/types';
import { Spinner, TabPanel } from 'shared/ui';
import { a11yProps } from 'shared/utils';

export const DietPlanPage: FC = () => {
  const { mdMain } = useMedia();
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const [openDialog, setOpenDialog] = useState(false);

  const ws = useWebSocket();

  const handleWS = useCallback(
    (e: MessageEvent<string>) => {
      const { type, data } = JSON.parse(e.data);
      if (type === SocketEvents.CHANGE_WEIGHT_EVENT) {
        dispatch(dietActions.updateDiet(data));
      }
    },
    [dispatch],
  );

  useEffect(() => {
    if (!ws) return;

    ws.addEventListener('message', handleWS);
    return () => ws.removeEventListener('message', handleWS);
  }, [handleWS, ws]);

  const { error, isLoading } = useGetOneDietQuery({ id: id! });
  const [updateDiet, { isLoading: isUpdateLoading }] = useUpdateDietMutation();
  const [deleteDiet] = useDeleteDietMutation();

  const diet: TDietPlan | null = useAppSelector(dietSelector.getDiet);

  const [tabIndex, setTabIndex] = useState<number>(0);
  useEffect(() => {
    setTabIndex(0);
  }, []);

  const handleDelete = () => {
    setOpenDialog(false);
    deleteDiet({ id: id! });
  };

  const handleTabChange = (formValues: any) => (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
    updateDiet({ id: id!, body: formValues });
  };

  if (!diet || error) {
    return <div>{'error' || ''}</div>;
  }

  if (isLoading || isUpdateLoading) {
    return <Spinner />;
  }

  return (
    <Grid container spacing={2}>
      <Grid item md={mdMain}>
        <Paper variant='elevation' elevation={4} sx={{ padding: '16px' }}>
          <Container sx={{ padding: '0!important' }}>
            <Formik
              initialValues={diet}
              onSubmit={(v) => {
                updateDiet({ id: id!, body: v });
              }}
            >
              {({ values }) => (
                <>
                  <Tabs
                    value={tabIndex}
                    onChange={handleTabChange(values)}
                    centered
                    variant='fullWidth'
                  >
                    <Tab wrapped label='Основные параметры' {...a11yProps(0)} />
                    <Tab wrapped label='Состав' {...a11yProps(1)} />
                    <Tab wrapped label='Итог' {...a11yProps(2)} />
                  </Tabs>

                  <Form>
                    <TabPanel value={tabIndex} index={0}>
                      <DietParams diet={diet} />
                    </TabPanel>
                    <TabPanel value={tabIndex} index={1}>
                      <DietConsist diet={diet} />
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
