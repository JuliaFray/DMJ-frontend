import React, {ComponentType} from 'react';
import {connect} from 'react-redux';
import Preloader from '../../Common/Preloader/Preloader';
import {compose} from 'redux';
import {actions} from '../../../redux/profile-reducer';
import Posts from './Posts';
import {PostType} from "../../../types/types";
import {AppStateType} from "../../../redux/redux-store";
import withAuthRedirect from '../../HOC/withAuthRedirect';

type MapDispatchPropsType = {
    sendPost: (text: string) => void,
}

type MapStatePropsType = {
    isFetching: boolean | undefined,
    postsData: Array<PostType>,
}

type OwnPropsType = {}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType;

const PostsContainer: React.FC<PropsType> = (props) => {
    return <>
        {props.isFetching ? <Preloader/> : null}
        <Posts
            sendPost={props.sendPost}
            postsData={props.postsData}
        />
    </>
};

let mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    postsData: state.profilePage.posts,
    isFetching: state.auth.isFetching
});

export default compose<ComponentType>(
    connect<MapStatePropsType, {}, MapDispatchPropsType, AppStateType>(
        mapStateToProps,
        {
            sendPost: actions.addPost
        }
    ),
    withAuthRedirect
)(PostsContainer);
