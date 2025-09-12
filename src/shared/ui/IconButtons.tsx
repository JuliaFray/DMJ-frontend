import React from 'react';

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import AlarmIcon from '@mui/icons-material/Alarm';
import DeleteIcon from '@mui/icons-material/Delete';
import Logout from '@mui/icons-material/Logout';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';

export default function IconButtons() {
  return (
    <Stack direction='row' spacing={1}>
      <IconButton aria-label='delete'>
        <DeleteIcon />
      </IconButton>
      <IconButton aria-label='delete' disabled color='primary'>
        <DeleteIcon />
      </IconButton>
      <IconButton color='secondary' aria-label='add an alarm'>
        <AlarmIcon />
      </IconButton>
      <IconButton color='primary' aria-label='add to shopping cart'>
        <AddShoppingCartIcon />
      </IconButton>
      <IconButton color='primary' aria-label='add to shopping cart'>
        <Logout color='primary' />
      </IconButton>
    </Stack>
  );
}
