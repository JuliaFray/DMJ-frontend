import React, { FC } from 'react';

import { useField, useFormikContext } from 'formik';

import { Box, Chip, MenuItem, TextField } from '@mui/material';
import { TextFieldProps } from '@mui/material/TextField/TextField';

import { TChipData } from '../../types';

interface Props {
  name: string;
  multiple?: boolean;
  options: TChipData[];
}

export const SelectWrapper: FC<Props & TextFieldProps> = ({
  name,
  options,
  multiple = false,
  ...otherProps
}) => {
  const [field, mata] = useField(name);
  const { setFieldValue } = useFormikContext();

  const handleChange = (evt) => {
    const { value } = evt.target;
    setFieldValue(name, value);
  };

  const fieldConfig = {
    ...field,
    ...otherProps,
    select: true,
    variant: 'outlined',
    fullWidth: true,
    onChange: handleChange,
    SelectProps: {
      multiple,
      renderValue: (selected) => {
        return (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {selected.map((value) => (
              <Chip
                key={value}
                label={(options || []).find((opt) => opt._id === value)?.value ?? ''}
              />
            ))}
          </Box>
        );
      },
    },
  };

  if (mata && mata.touched && mata.error) {
    fieldConfig.error = true;
    fieldConfig.helperText = mata.error;
  }

  return (
    // @ts-ignore
    <TextField {...fieldConfig}>
      {options.map((item, pos) => (
        <MenuItem key={pos} value={item._id}>
          {item.value}
        </MenuItem>
      ))}
    </TextField>
  );
};
