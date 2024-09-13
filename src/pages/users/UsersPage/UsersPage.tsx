import React, {useState} from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {withAuthRedirect} from 'shared/lib/react/react.hoc';
import {RootState} from 'shared/model/redux-store';
import CommonLayoutUi from 'shared/ui/layouts/common-layout.ui';
import UsersMain from './UsersMain';

export type IUsersPage = {
    isMainPage: boolean,
    isFollowers: boolean
}

const UsersPage: React.FC<IUsersPage> = React.memo((props, context) => {
    const [currentPage, setCurrentPage] = useState(1);
    return (
        <CommonLayoutUi isMainPage={props.isMainPage}
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
