import React from 'react';

import { withErrorBoundary } from 'react-error-boundary';
import { Provider } from 'react-redux';
import { compose } from 'redux';

import { ThemeProvider } from '@mui/material/styles';

import { useAppSelector } from 'shared/hook';
import { spinnerSelector, store } from 'shared/model';
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
  const display = useAppSelector(spinnerSelector.getSpinnerDisplay);

  return <Spinner display={display} />;
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
