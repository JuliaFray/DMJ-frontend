import { RootState } from '../redux-store';

export const getSpinnerState = (state: RootState) => {
  return state.spinner.display;
};
