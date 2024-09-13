import {RootState} from "shared/model/redux-store";

export const getSpinnerState = (state: RootState) => {
    return state.spinner.display;
}
