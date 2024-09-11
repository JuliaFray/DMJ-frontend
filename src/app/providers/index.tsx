import React from "react";
import {ThemeProvider} from "@mui/material/styles";
import {withErrorBoundary} from "react-error-boundary";
import {Provider, useSelector} from "react-redux";
import {compose} from "redux";
import WS from "../../Components/Common/WebSocketContext";
import store from "../../redux/redux-store";
import {theme} from "../../styles/theme";
import {ErrorHandler, logError} from "./../../shared/ui/error-handler";
import {Spinner, spinnerModel} from "./../../shared/ui/spinner";
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
    const display = useSelector(spinnerModel.getSpinnerState);

    return (
        <Spinner display={display} position="bottom-right"/>
    )
}
