import React from "react";

import {BrowserRouting} from "app/providers/RouterProvider";
import {withErrorBoundary} from "react-error-boundary";
import {Provider, useSelector} from "react-redux";
import {compose} from "redux";

import {ThemeProvider} from "@mui/material/styles";

import store from "shared/model/redux-store";
import {spinnerSelector} from "shared/model/spinner";
import {theme} from "shared/themes/theme";
import WS from "shared/ui/WebSocketContext";
import {ErrorHandler, logError} from "shared/ui/error-handler";
import {Spinner} from "shared/ui/spinner";

const enhance = compose((component: React.ComponentType<Object>) =>
    withErrorBoundary(component, {
        FallbackComponent: ErrorHandler,
        onError: logError,
    })
);

export const AppProvider = enhance(() => (
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <WS>
                <GlobalSpinner/>
                <BrowserRouting/>
            </WS>
        </ThemeProvider>
    </Provider>
));

const GlobalSpinner = () => {
    const display = useSelector(spinnerSelector.getSpinnerState);

    return <Spinner display={display} position="bottom-right"/>;
};
