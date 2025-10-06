import React, { FC, useEffect, useState } from 'react';

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

import { useGetOneDietQuery } from 'shared/api';
import { useAppDispatch, useMedia } from 'shared/hook';
import { TabPanel } from 'shared/ui';
import { a11yProps } from 'shared/utils';

export const DietPlanPage: FC = () => {
  const { mdMain, mdSide } = useMedia();
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const { data, error, isLoading } = useGetOneDietQuery({ id: id! });

  const [tabIndex, setTabIndex] = useState<number>(0);
  useEffect(() => {
    setTabIndex(0);
  }, []);

  const [openDialog, setOpenDialog] = useState(false);
  const handleDelete = () => {
    setOpenDialog(false);
    console.log('delete');
  };

  if (!data) {
    return <div>error</div>;
  }

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <Grid container spacing={2}>
      <Grid item md={mdMain}>
        <Paper variant='elevation' elevation={4} sx={{ padding: '16px' }}>
          <Container sx={{ padding: '0!important' }}>
            <Tabs value={tabIndex} onChange={handleTabChange} centered variant='fullWidth'>
              <Tab wrapped label='Основные параметры' {...a11yProps(0)} />
              <Tab wrapped label='Состав' {...a11yProps(1)} />
              <Tab wrapped label='Итог' {...a11yProps(2)} />
            </Tabs>

            <Formik initialValues={data.data} onSubmit={(v) => console.log(v)}>
              {() => (
                <Form>
                  <TabPanel value={tabIndex} index={0}>
                    <DietParams diet={data.data} />
                  </TabPanel>
                  <TabPanel value={tabIndex} index={1}>
                    <DietConsist diet={data.data} />
                  </TabPanel>

                  <Box sx={{ display: 'flex', justifyContent: 'end', gap: '20px' }}>
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
