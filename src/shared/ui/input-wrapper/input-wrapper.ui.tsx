import React, { FC } from 'react';

import { useField } from 'formik';

import { TextField } from '@mui/material';
import { TextFieldProps } from '@mui/material/TextField/TextField';

interface Props {
  name: string;
}

export const InputWrapper: FC<Props & TextFieldProps> = ({ name, ...otherProps }) => {
  const [field, mata] = useField(name);

  const fieldConfig = {
    ...field,
    ...otherProps,
    fullWidth: true,
    variant: 'outlined',
  };

  if (mata && mata.touched && mata.error) {
    fieldConfig.error = true;
    fieldConfig.helperText = mata.error;
  }

  // @ts-ignore
  return <TextField {...fieldConfig} />;
};
