/* eslint-disable import/no-unresolved */
import React, { FC } from 'react';

import { useField } from 'formik';

import { Input, MultiSelect, NumberInput, PasswordInput, Select } from '@mantine/core';
import { InputProps } from '@mantine/core/lib/components/Input/Input';
import { MultiSelectProps } from '@mantine/core/lib/components/MultiSelect/MultiSelect';
import { NumberInputProps } from '@mantine/core/lib/components/NumberInput/NumberInput';
import { PasswordInputProps } from '@mantine/core/lib/components/PasswordInput/PasswordInput';
import { SelectProps } from '@mantine/core/lib/components/Select/Select';

interface Props {
  name: string;
  label: string;
  type?: 'string' | 'password' | 'number' | 'select' | 'multiselect';
}

type CustomInputProps =
  | PasswordInputProps
  | InputProps
  | NumberInputProps
  | SelectProps
  | MultiSelectProps;

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
      {type === 'select' && <Select {...field} {...(otherProps as SelectProps)} />}
      {type === 'multiselect' && <MultiSelect {...field} {...(otherProps as MultiSelectProps)} />}
    </Input.Wrapper>
  );
};
