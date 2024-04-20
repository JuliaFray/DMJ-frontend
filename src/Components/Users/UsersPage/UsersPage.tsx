import React from 'react';
import {compose} from 'redux';
import withAuthRedirect from '../../HOC/withAuthRedirect';
import PageLayout from '../../Common/PageLayout';
import UsersMain from './UsersMain';
import {RootState} from '../../../redux/redux-store';
import {connect} from 'react-redux';

export type IUsersPage = {
    isMainPage: boolean,
}

const UsersPage: React.FC<IUsersPage> = React.memo((props, context) => {
    return (
        <PageLayout isMainPage={props.isMainPage} mainChildren={<UsersMain/>}/>
    )
});

const mapStateToProps = (state: RootState) => ({
    isMainPage: true,
});

export {UsersPage};

export default compose<React.ComponentType & IUsersPage>(connect(mapStateToProps), withAuthRedirect)(UsersPage);
