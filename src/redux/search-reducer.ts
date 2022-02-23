import {InferActionType} from './redux-store';

type InitialStateType = {
    newSearchText: string
}
type ActionsType = InferActionType<typeof actions>;


let initialState: InitialStateType = {
    newSearchText: ''
};

const searchReducer = (state = initialState, action: ActionsType): InitialStateType => {

    switch(action.type) {
        case 'SN/SEARCH/UPDATE_NEW_SEARCH_TEXT':
            state.newSearchText = action.newSearchText;
            return state;
        default:
            return state;
    }
};

export const actions = {
    addSearchActionCreator: () => ({type: 'SN/SEARCH/ADD_SEARCH'} as const),
    updateNewSearchTextActionCreator: (text: string) => ({type: 'SN/SEARCH/UPDATE_NEW_SEARCH_TEXT', newSearchText: text} as const)
};

export default searchReducer;
