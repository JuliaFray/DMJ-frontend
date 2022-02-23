import {actions} from '../../../../redux/profile-reducer';
import SendPost from './SendPost';
import {connect} from 'react-redux';
import {AppStateType} from "../../../../redux/redux-store";

type MapStatePropsType = {
    newPostText: string
}

type MapDispatchPropsType = {
    addPost: (text: string) => void
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        newPostText: state.profilePage.newPostText
    };
};

const SendPostContainer = connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(
    mapStateToProps, {
        addPost: actions.addPost
    })(SendPost);

export default SendPostContainer;
