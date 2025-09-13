import React, { FC } from 'react';

import { Form, Formik } from 'formik';

import { TextField } from '@mui/material';

import { TDietPlan } from 'shared/types';

interface Props {
  diet: TDietPlan;
}

export const DietConsist: FC<Props> = ({ diet }) => {
  return (
    <Formik initialValues={diet} onSubmit={(v) => console.log(v)}>
      {({ values, errors }) => (
        <Form>
          <TextField label='Название плана' variant='outlined' value={values.name} />
          <TextField label='Количество дней' value={values.period} />
        </Form>
      )}
    </Formik>
  );
};
