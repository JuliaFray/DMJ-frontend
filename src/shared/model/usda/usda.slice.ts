import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {usdaApi} from "~shared/api/usda-api";

type TInitial = {
    display: any,
}

const initialState: TInitial = {
    display: {}
}

const usdaSlice = createSlice({
        name: 'usda',
        initialState,
        reducers: {},
        extraReducers: (builder) => {
            builder.addMatcher(
                usdaApi.endpoints.getFood.matchFulfilled,
                (state: TInitial, action: PayloadAction<any>) => {
                    state.display = action.payload;
                }
            )
        }
    }
)
const usdaActions = usdaSlice.actions;
const usdaReducer = usdaSlice.reducer;

export {usdaSlice, usdaActions, usdaReducer}
