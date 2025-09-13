import React, { FC } from 'react';

import { useField } from 'formik';

import { MenuItem, TextField } from '@mui/material';
import { TextFieldProps } from '@mui/material/TextField/TextField';

interface Props<T> {
  name: string;
  options: T[];
}

export const SelectWrapper = () => {
  return <div>select</div>;
};
//
// export const SelectWrapper =
//   <T,>(): FC<Props<T> & TextFieldProps> =>
//   ({ name, options, ...otherProps }) => {
//     const [field, mata] = useField(name);
//     const { setFieldValue } = useFormikContext();
//
//     const handleChange = (evt) => {
//       const { value } = evt.target;
//       setFieldValue(name, value);
//     };
//
//     const fieldConfig = {
//       ...field,
//       ...otherProps,
//       select: true,
//       variant: 'outlined',
//       fullWidth: true,
//       onChange: handleChange,
//     };
//
//     if (mata && mata.touched && mata.error) {
//       fieldConfig.error = true;
//       fieldConfig.helperText = mata.error;
//     }
//
//     return (
//       // @ts-ignore
//       <TextField {...fieldConfig}>
//         {Object.keys(options).map((item, pos) => {
//           return (
//             <MenuItem key={pos} value={item}>
//               {options[item]}
//             </MenuItem>
//           );
//         })}
//       </TextField>
//     );
//   };
