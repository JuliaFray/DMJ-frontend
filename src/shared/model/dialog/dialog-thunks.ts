import { createAsyncThunk } from '@reduxjs/toolkit';

import { CountResponseType, ResultCodes } from '../../api/api-types';
import { dialogAPI } from '../../api/dialog-api';
import { ACCESS_DENIED } from '../../lib';
import { IDialog, IMessage, IUser } from '../../types';
import { appActions } from '../apps';
import { authActions } from '../auth';

const UNDEFINED_ERROR = 'Неизвестная ошибка';

export const getAllDialogs = createAsyncThunk<CountResponseType<IDialog[]>, { query: string }>(
  'dialogs',
  async (data, thunkAPI) => {
    try {
      const response = await dialogAPI.getAllDialogs(data.query);
      if (response.resultCode === ResultCodes.UndefinedError) {
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
  CountResponseType<IMessage[]>,
  { dialogId: string }
>('messages', async (data, thunkAPI) => {
  try {
    const response = await dialogAPI.getMessagesByDialog(data.dialogId);
    if (response.resultCode === ResultCodes.UndefinedError) {
      return thunkAPI.rejectWithValue(UNDEFINED_ERROR);
    }
    return response;
  } catch (e) {
    thunkAPI.dispatch(authActions.logout());
    thunkAPI.dispatch(appActions.setUninitialized());
    return thunkAPI.rejectWithValue(ACCESS_DENIED);
  }
});

export const getUsersWithStatus = createAsyncThunk<CountResponseType<IUser[]>, { query: string }>(
  'users',
  async (data, thunkAPI) => {
    try {
      const response = await dialogAPI.getUsersWithStatus(data.query);
      if (response.resultCode === ResultCodes.UndefinedError) {
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
