const ADD_SEARCH = 'ADD-SEARCH';
const UPDATE_NEW_SEARCH_TEXT = 'UPDATE-NEW-SEARCH-TEXT';

let initialState = {
    newSearchText: ''
}

const searchReducer = (state = initialState, action) => {

    switch (action.type) {

        case UPDATE_NEW_SEARCH_TEXT:
            state.newSearchText = action.newSearchText;
            return state;

        default:
            return state;
    }
};

export const addSearchActionCreator = () => ({ type: ADD_SEARCH });

export const updateNewSearchTextActionCreator = (text) =>
    ({ type: UPDATE_NEW_SEARCH_TEXT, newSearchText: text }
    );

export default searchReducer;