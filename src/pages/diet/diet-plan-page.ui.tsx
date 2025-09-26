import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

import { Article, Grade, People } from '@mui/icons-material';
import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import { Grid, Tab, Tabs, useMediaQuery, Container } from '@mui/material';

import { useGetOneDietQuery } from 'shared/api';
import { useAppDispatch } from 'shared/hook';
import { theme } from 'shared/themes';
import { TabPanel } from 'shared/ui';

import { DietConsist } from 'widgets';

import { UsersPage } from '../users';

const a11yProps = (index: number) => {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
};

export const DietPlanPage: React.FC = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const isMore1200px = useMediaQuery(theme.breakpoints.up('lg'));
  const mdMain = isMore1200px ? 9 : 12;
  const mdSide = 3;

  const { data, error, isLoading } = useGetOneDietQuery(id);
  console.log(data);

  const [tabIndex, setTabIndex] = useState<number>(0);
  useEffect(() => {
    setTabIndex(0);
  }, []);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <Grid container spacing={2}>
      <Grid item md={mdMain}>
        <Container>
          <Tabs value={tabIndex} onChange={handleTabChange} centered variant='fullWidth'>
            <Tab
              iconPosition='start'
              icon={<People color='disabled' />}
              label='Состав'
              {...a11yProps(0)}
            />
            <Tab
              iconPosition='start'
              icon={<Article color='disabled' />}
              label='Описание'
              {...a11yProps(1)}
            />
            <Tab
              iconPosition='start'
              icon={<CommentIcon color='disabled' />}
              label='Настройки'
              {...a11yProps(2)}
            />
          </Tabs>

          <TabPanel value={tabIndex} index={0}>
            <DietConsist
              diet={{
                _id: '1',
                name: 'test',
                period: 1,
                author: {
                  _id: '11',
                  login: 'login',
                  email: 'email',
                  userId: 'userId',
                },
                meals: [1, 2, 3],
                stats: {
                  plan: {
                    cal: 111,
                    proteins: 11,
                    fats: 11,
                    carb: 11,
                  },
                  fact: {
                    cal: 111,
                    proteins: 11,
                    fats: 11,
                    carb: 11,
                  },
                  rating: 5,
                },
              }}
            />
          </TabPanel>
        </Container>
      </Grid>
    </Grid>
  );
};
