import React from "react";
import {ThemeProvider} from "@mui/material/styles";
import {withErrorBoundary} from "react-error-boundary";
import {Provider, useSelector} from "react-redux";
import {compose} from "redux";
import store from "shared/model/redux-store";
import {spinnerSelector} from 'shared/model/spinner';
import {theme} from "shared/themes/theme";
import {ErrorHandler, logError} from "shared/ui/error-handler";
import {Spinner} from "shared/ui/spinner";
import WS from "shared/ui/WebSocketContext";
import {BrowserRouting} from "./../providers/RouterProvider";

const enhance = compose((component: React.ComponentType<Object>) =>
    withErrorBoundary(component, {
        FallbackComponent: ErrorHandler,
        onError: logError,
    }),
)

export const AppProvider = enhance(() => (
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <WS>
                <GlobalSpinner/>
                <BrowserRouting/>
            </WS>
        </ThemeProvider>
    </Provider>
))

const GlobalSpinner = () => {
    const display = useSelector(spinnerSelector.getSpinnerState);

    return (
        <Spinner display={display} position="bottom-right"/>
    )
}
