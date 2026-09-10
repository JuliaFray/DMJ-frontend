import { useMediaQuery } from '@mantine/hooks';

export const useMedia = () => {
  const isMore1200px = useMediaQuery('(min-width: 48em)');
  const mdMain = isMore1200px ? 8 : 12;
  const mdSide = isMore1200px ? 4 : 0;

  return { mdMain, mdSide, isMore1200px };
};
