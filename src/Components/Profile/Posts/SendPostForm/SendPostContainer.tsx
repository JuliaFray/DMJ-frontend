import {actions, createUserPost} from '../../../../redux/profile-reducer';
import SendPost, {FormDataType} from './SendPost';
import {useDispatch} from 'react-redux';
import React from 'react';


const SendPostContainer: React.FC = () => {
    const dispatch = useDispatch();

    let onSendPost = (values: FormDataType) => {
        const post = {
            id: '',
            title: values.newPostText,
            text: values.newPostText,
            tags: []
        }
        dispatch(createUserPost(post));
    };

    return (
        <SendPost onSubmit={onSendPost}/>
    )
};

export default SendPostContainer;
