import { useMediaQuery } from '@mui/material';

import { theme } from 'shared/themes';

export const useMedia = (isMainPage: boolean) => {
  const isMore1200px = useMediaQuery(theme.breakpoints.up('lg'));
  const mdMain = isMainPage && isMore1200px ? 9 : 12;
  const mdSide = 3;

  return { mdMain, mdSide };
};
