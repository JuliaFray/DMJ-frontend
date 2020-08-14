const ADD_MSG = 'ADD-MSG';
const UPDATE_NEW_MSG_TEXT = 'UPDATE-NEW-MSG-TEXT';

let initialState = {
    messages: [
        { id: 1, message: 'Hi' },
        { id: 2, message: 'Yo' },
        { id: 3, message: 'Wazap' },
        { id: 4, message: 'Fine. Where are you?' }
    ],

    dialogs: [
        { id: 1, name: 'Name 1' },
        { id: 2, name: 'Name 2' },
        { id: 3, name: 'Name 3' },
        { id: 4, name: 'Name 4' },
        { id: 5, name: 'Name 5' }
    ]
}

const dialogReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_MSG:
            let newMsg = {
                id: 5,
                message: action.newMsgText
            };

            return {
                ...state,
                messages: [...state.messages, newMsg]
            };

        // case UPDATE_NEW_MSG_TEXT:
        //         return {
        //             ...state,
        //             newMsgText: action.newMsgText
        //         };

        default:
            return state;
    }
};

export const addMsgActionCreator = (newMsgText) => ({ type: ADD_MSG, newMsgText });

// export const updateNewMsgTextActionCreator = (text) =>
//     ({ type: UPDATE_NEW_MSG_TEXT, newMsgText: text }
//     );

export default dialogReducer;