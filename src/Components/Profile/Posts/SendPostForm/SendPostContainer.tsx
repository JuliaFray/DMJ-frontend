import {actions} from '../../../../redux/profile-reducer';
import SendPost, {FormDataType} from './SendPost';
import {useDispatch} from 'react-redux';
import React from 'react';


const SendPostContainer: React.FC = () => {
    const dispatch = useDispatch();

    let onSendPost = (values: FormDataType) => {
        dispatch(actions.addPost(values.newPostText));
    };

    return (
        <SendPost onSubmit={onSendPost}/>
    )
};

export default SendPostContainer;
