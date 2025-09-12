import React from 'react';

import { withErrorBoundary } from 'react-error-boundary';
import { Provider, useSelector } from 'react-redux';
import { compose } from 'redux';

import { ThemeProvider } from '@mui/material/styles';

import { getSpinnerState, store } from 'shared/model';
import { theme } from 'shared/themes';
import { ErrorHandler, logError, Spinner, WS } from 'shared/ui';

import { BrowserRouting } from './RouterProvider';

const enhance = compose((component: React.ComponentType) =>
  withErrorBoundary(component, {
    FallbackComponent: ErrorHandler,
    onError: logError,
  }),
);

function GlobalSpinner() {
  const display = useSelector(getSpinnerState);

  return <Spinner display={display} position='bottom-right' />;
}

export const AppProvider = enhance(() => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <WS>
        <GlobalSpinner />
        <BrowserRouting />
      </WS>
    </ThemeProvider>
  </Provider>
));
