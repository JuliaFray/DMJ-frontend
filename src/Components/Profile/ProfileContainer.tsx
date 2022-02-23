import React, {ComponentType} from 'react';
import {connect} from 'react-redux';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {compose} from 'redux';
import {getUserProfile, getUserStatus, savePhoto, saveProfile, updateUserStatus} from '../../redux/profile-reducer';
import Profile from './Profile';
import {ProfileType} from '../../types/types';
import {AppStateType} from '../../redux/redux-store';

type MapStatePropsType = {
    profile: ProfileType | null,
    status: string,
    authorizeUserId: number | null,
    isAuth: boolean
}

type MapDispatchPropsType = {
    getProfileTC: (id: number) => void,
    getUserStatus: (id: number) => void,
    updateUserStatus: (status: string) => void,
    savePhoto: (data: File) => void,
    saveProfile: (data: ProfileType) => void
}

type PathParamsType = {
    userId: string
}

type PropsType = RouteComponentProps<PathParamsType> & MapStatePropsType & MapDispatchPropsType

class ProfileContainer extends React.Component<PropsType> {

    refreshProfile() {
        let userId: number | null = +this.props.match.params.userId;
        if (!userId) {
            userId = this.props.authorizeUserId;
            if (!userId) {
                this.props.history.push('/login')
            }
        }
        if (userId) {
            this.props.getProfileTC(userId);
            this.props.getUserStatus(userId);
        } else {
            throw new Error('ID should exists')
        }
        this.props.updateUserStatus(this.props.status);
    }

    componentDidMount() {
        this.refreshProfile();
    }

    componentDidUpdate(prevProps: PropsType, prevState: PropsType) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile();
        }
    }


    render() {
        return (
            <Profile {...this.props}
                     profile={this.props.profile}
                     status={this.props.status}
                     updateUserStatus={this.props.updateUserStatus}
                     isOwner={!this.props.match.params.userId}
                     savePhoto={this.props.savePhoto}
                     saveProfile={this.props.saveProfile}/>
        )
    }

}

let mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizeUserId: state.auth.id,
    isAuth: state.auth.isAuth
});

export default compose<ComponentType>(
    connect<MapStatePropsType, {}, MapDispatchPropsType, AppStateType>(
        mapStateToProps,
        {
            getProfileTC: getUserProfile,
            getUserStatus,
            updateUserStatus,
            savePhoto,
            saveProfile
        }
    ),
    withRouter
)(ProfileContainer)
