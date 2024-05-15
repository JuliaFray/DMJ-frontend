import React, {useState} from 'react';
import {compose} from 'redux';
import withAuthRedirect from '../../HOC/withAuthRedirect';
import PageLayout from '../../Common/PageLayout/PageLayout';
import UsersMain from './UsersMain';
import {RootState} from '../../../redux/redux-store';
import {connect} from 'react-redux';

export type IUsersPage = {
    isMainPage: boolean,
    isFollowers: boolean
}

const UsersPage: React.FC<IUsersPage> = React.memo((props, context) => {
    const [currentPage, setCurrentPage] = useState(1);
    return (
        <PageLayout isMainPage={props.isMainPage}
                    mainChildren={<UsersMain
                        isFollowers={props.isFollowers}
                        currentPage={currentPage} setCurrentPage={setCurrentPage}
                    />}/>
    )
});

const mapStateToProps = (state: RootState) => ({
    isMainPage: true,
    isFollowers: false
});

export {UsersPage};

export default compose<React.ComponentType & IUsersPage>(connect(mapStateToProps), withAuthRedirect)(UsersPage);
