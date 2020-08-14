import profileReducer from "./profile-reducer";
import dialogReducer from "./dialog-reducer";
import sidebarReducer from "./sidebar-reducer";

let store = {
    
    _state: {
        
        profilePage: {
            posts: [
                { id: 1, message: 'My first post', like: 10, dislike: 0 },
                { id: 2, message: 'Hi, my new post', like: 20, dislike: 1 }
            ],

            newPostText: ''
        },

        messagePage: {
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
            ],

            newMsgText: ''
        },

        sidebar: [
            { id: 1, name: 'Name 1' },
            { id: 2, name: 'Name 2' },
            { id: 3, name: 'Name 3' }
        ],

        search: {
            newSearchText: ''
        }
    },
    _rerenderEntireTree() {

    },

    getState() {
        return this._state
    },
    subscribe(observer) {
        this._rerenderEntireTree = observer;
    },

    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.messagePage = dialogReducer(this._state.messagePage, action);
        this._state.sidebar = sidebarReducer(this._state.sidebar, action);
        this._rerenderEntireTree(this._state);
    }
};

export default store;