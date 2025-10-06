import { createAsyncThunk } from '@reduxjs/toolkit';

import { TDialog, TMessage, TUser } from 'shared/types';

import { CountResponseType, ResultCodes } from '../../api/api-types';
import { dialogAPI } from '../../api/dialog-api';
import { ACCESS_DENIED } from '../../lib';
import { appActions } from '../apps';
import { authActions } from '../auth';

const UNDEFINED_ERROR = 'Неизвестная ошибка';

export const getAllDialogs = createAsyncThunk<CountResponseType<TDialog[]>, { query: string }>(
  'dialogs',
  async (data, thunkAPI) => {
    try {
      const response = await dialogAPI.getAllDialogs(data.query);
      if (response.resultCode === ResultCodes.Error) {
        return thunkAPI.rejectWithValue(UNDEFINED_ERROR);
      }
      return response;
    } catch (e) {
      thunkAPI.dispatch(authActions.logout());
      thunkAPI.dispatch(appActions.setUninitialized());
      return thunkAPI.rejectWithValue(ACCESS_DENIED);
    }
  },
);

export const getMessagesByDialogId = createAsyncThunk<
  CountResponseType<TMessage[]>,
  { dialogId: string }
>('messages', async (data, thunkAPI) => {
  try {
    const response = await dialogAPI.getMessagesByDialog(data.dialogId);
    if (response.resultCode === ResultCodes.Error) {
      return thunkAPI.rejectWithValue(UNDEFINED_ERROR);
    }
    return response;
  } catch (e) {
    thunkAPI.dispatch(authActions.logout());
    thunkAPI.dispatch(appActions.setUninitialized());
    return thunkAPI.rejectWithValue(ACCESS_DENIED);
  }
});

export const getUsersWithStatus = createAsyncThunk<CountResponseType<TUser[]>, { query: string }>(
  'users',
  async (data, thunkAPI) => {
    try {
      const response = await dialogAPI.getUsersWithStatus(data.query);
      if (response.resultCode === ResultCodes.Error) {
        return thunkAPI.rejectWithValue(UNDEFINED_ERROR);
      }
      return response;
    } catch (e) {
      thunkAPI.dispatch(authActions.logout());
      thunkAPI.dispatch(appActions.setUninitialized());
      return thunkAPI.rejectWithValue(ACCESS_DENIED);
    }
  },
);
