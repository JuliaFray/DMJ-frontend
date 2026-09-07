import { appSelector } from '../model';

import { useAppSelector } from './hooks';

export const useOnline = (profileId: string) => {
  const users = useAppSelector(appSelector.getAppUserOnline);

  const isOnline = users.includes(profileId);

  return {
    isOnline,
  };
};
