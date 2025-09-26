import { RootState } from '../redux-store';

export const getProfile = (state: RootState) => {
  return state.profile.profile;
};

export const getProfileAvatar = (state: RootState) => {
  return state.profile?.profile?.avatar;
};

export const getProfileFullName = (state: RootState) => {
  const profile = state.profile?.profile || '';
  return profile ? `${profile.login}` : '';
};

export const getMyProfile = (state: RootState) => {
  return state.profile.my;
};

export const getMyProfileAvatar = (state: RootState) => {
  return state.profile?.my?.avatar;
};

export const getMyProfileFullName = (state: RootState) => {
  const profile = state.profile?.my || '';
  return profile ? profile.login : '';
};

export const getMyProfileShortName = (state: RootState) => {
  const profile = state.profile?.my || '';
  return profile ? profile.login : '';
};

export const getProfileEmail = (state: RootState) => {
  return state.profile.my?.email ?? '';
};

export const getStats = (state: RootState) => {
  return state.profile.stats;
};

export const getProfileIsFetching = (state: RootState) => {
  return state.profile.isFetching;
};
