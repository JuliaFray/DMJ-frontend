import React from 'react';

import { Form, Formik } from 'formik';

import { Accordion } from '@mantine/core';

import { useChangeProfileMutation } from 'shared/api';
import { useAuth } from 'shared/context';
import { useAppDispatch } from 'shared/hook';
import { profileActions } from 'shared/model';
import { ActivityLevel, Gender, IUser } from 'shared/types';

import { DietDiarySettings } from '../diet-diary-settings';

import classes from './settings-accordion.module.scss';

export const SettingsAccordion = () => {
  const { me } = useAuth();
  const user = me as IUser;

  const dispatch = useAppDispatch();

  const [changeProfile, { isLoading: isUpdateLoading }] = useChangeProfileMutation();

  const handleChangeProfile = (data: Partial<IUser>) => {
    changeProfile({ user: data });
    dispatch(profileActions.changeLogin(data.login));
  };

  return (
    <Formik
      initialValues={{
        _id: user._id,
        email: user.email,
        login: user.login || '',
        avatarId: user.avatarId,
        height: user.config.height || null,
        weight: user.config.weight || null,
        targetWeight: user.config.targets.targetWeight || null,
        targetCalories: user.config.targets.targetCalories || null,
        age: user.config.age || null,
        gender: (user.config.gender || 'other') as Gender,
        activityLevel: (user.config.activityLevel || 'sedentary') as ActivityLevel,
        goal: user.config.goal || '',
      }}
      onSubmit={handleChangeProfile}
      enableReinitialize
    >
      {() => (
        <Form>
          <Accordion variant='separated'>
            <Accordion.Item className={classes.item} value='my-profile'>
              <Accordion.Control>Мой профиль</Accordion.Control>
              <Accordion.Panel>
                <DietDiarySettings isFetching={isUpdateLoading} />
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        </Form>
      )}
    </Formik>
  );
};
