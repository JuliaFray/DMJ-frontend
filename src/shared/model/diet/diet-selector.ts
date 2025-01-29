import { RootState } from "../redux-store";

export const getDiets = (state: RootState) => {
  return state.diets.diets;
};

export const getDietsDataLength = (state: RootState) => {
  return state.diets.totalCount || 0;
};

export const getDietsIsFetching = (state: RootState) => {
  return state.diets.isFetching;
};
