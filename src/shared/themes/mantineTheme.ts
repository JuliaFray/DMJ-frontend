import { createTheme, Loader } from '@mantine/core';

import { Spinner } from '../ui/spinner/spinner.ui';

export const mantineTheme = createTheme({
  primaryColor: 'teal',
  defaultRadius: 'sm',
  components: {
    Loader: Loader.extend({
      defaultProps: {
        loaders: { ...Loader.defaultLoaders, custom: Spinner },
        type: 'ring',
        color: 'teal',
        size: 'md',
      },
    }),
  },
});
