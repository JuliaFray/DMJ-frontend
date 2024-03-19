import {IMessage, SimpleNameObj} from '../../types/types';
import {Dispatch} from 'redux';
import {GenericThunkType, InferActionType} from '../redux-store';

type InitialStateType = {
    messages: Array<IMessage>,
    dialogs: Array<SimpleNameObj>
};
type ActionsType = InferActionType<typeof actions>;
type DispatchType = Dispatch<ActionsType>;
type ThunkType = GenericThunkType<ActionsType>;

let initialState: InitialStateType = {
    messages: [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'Yo'},
        {id: 3, message: 'Wazap'},
        {id: 4, message: 'Fine. Where are you?'}
    ],

    dialogs: [
        {id: 1, name: 'Name 1'},
        {id: 2, name: 'Name 2'},
        {id: 3, name: 'Name 3'},
        {id: 4, name: 'Name 4'},
        {id: 5, name: 'Name 5'}
    ]
};

const dialogReducer = (state = initialState, action: ActionsType): InitialStateType => {

    switch(action.type) {
        case 'SN/DIALOG/SEND_MSG':
            let newMsg: IMessage = {
                id: state.messages.length + 1,
                message: action.newMsgText
            };
            return {
                ...state,
                messages: [...state.messages, newMsg]
            };
        default:
            return state;
    }
};

export const actions = {
    sendMsg: (newMsgText: string) => ({type: 'SN/DIALOG/SEND_MSG', newMsgText} as const)
};

export default dialogReducer;
