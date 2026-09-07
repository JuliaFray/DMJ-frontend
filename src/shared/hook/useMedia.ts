import { useMediaQuery } from '@mantine/hooks';

import { theme } from '../themes';

export const useMedia = () => {
  const isMore1200px = useMediaQuery(theme.breakpoints.up('lg'));
  const mdMain = isMore1200px ? 8 : 12;
  const mdSide = isMore1200px ? 4 : 0;

  return { mdMain, mdSide, isMore1200px };
};
