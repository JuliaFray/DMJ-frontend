/* eslint-disable import/no-unresolved */
import React, { FC } from 'react';

import { useField } from 'formik';

import { Input, NumberInput, PasswordInput } from '@mantine/core';
import { InputProps } from '@mantine/core/lib/components/Input/Input';
import { NumberInputProps } from '@mantine/core/lib/components/NumberInput/NumberInput';
import { PasswordInputProps } from '@mantine/core/lib/components/PasswordInput/PasswordInput';

interface Props {
  name: string;
  label: string;
  type?: 'string' | 'password' | 'number';
}

type CustomInputProps = PasswordInputProps | InputProps | NumberInputProps;

export const InputWrapper: FC<Props & CustomInputProps> = ({
  name,
  label,
  type = 'string',
  ...otherProps
}) => {
  const [field, meta] = useField(name);

  const fieldConfig = {
    ...field,
    ...otherProps,
  };

  if (meta && meta.touched && meta.error) {
    fieldConfig.error = meta.error;
  }

  return (
    <Input.Wrapper
      style={{ height: '80px' }}
      className={fieldConfig.className}
      label={label}
      error={meta.error}
    >
      {type === 'string' && <Input {...field} {...(otherProps as InputProps)} />}
      {type === 'number' && <NumberInput {...field} {...(otherProps as NumberInputProps)} />}
      {type === 'password' && <PasswordInput {...field} {...(otherProps as PasswordInputProps)} />}
    </Input.Wrapper>
  );
};
