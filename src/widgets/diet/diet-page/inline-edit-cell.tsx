import React, { FC, useState } from 'react';

import { InlineEdit, Input } from 'rsuite';

import { Typography } from '@mui/material';

interface Props {
  initialValue: number;
  handleChange: (newVal: number) => void;
}

export const InlineEditCell: FC<Props> = ({ initialValue, handleChange }) => {
  const [val, setVal] = useState(initialValue);
  return (
    <InlineEdit
      size='sm'
      showControls={false}
      stateOnBlur='save'
      onSave={() => {
        if (val !== initialValue) {
          handleChange(val);
        }
      }}
      onChange={(value) => setVal(value)}
      defaultValue={val}
    >
      {
        // @ts-ignore
        (prop, ref) => {
          const { value, onChange, plaintext, ...rest } = prop;

          if (plaintext) {
            return <span>{value}</span>;
          }

          return (
            <Input
              {...rest}
              as='input'
              ref={ref}
              value={value}
              onChange={(event) => {
                // @ts-ignore
                onChange(event, event);
              }}
              width='50%'
              style={{ textAlign: 'right' }}
            />
          );
        }
      }
    </InlineEdit>
  );
};
