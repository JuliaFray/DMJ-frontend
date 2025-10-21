import { RootState } from '../redux-store';

import { dietSlice } from './diet-slice';

export const getDietsDataLength = (state: RootState) => {
  return state[dietSlice.reducerPath]?.totalCount || 0;
};

export const getDietsIsFetching = (state: RootState) => {
  return state[dietSlice.reducerPath]?.isFetching;
};
