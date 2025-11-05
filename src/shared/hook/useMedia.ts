import { useMediaQuery } from '@mui/material';

import { theme } from 'shared/themes';

export const useMedia = (isMainPage = true) => {
  const isMore1200px = useMediaQuery(theme.breakpoints.up('lg'));
  const mdMain = isMore1200px ? 8 : 12;
  // const mdMain = 8;
  const mdSide = isMore1200px ? 4 : 0;

  return { mdMain, mdSide, isMore1200px };
};
