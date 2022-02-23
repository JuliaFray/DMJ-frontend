import React, {ComponentType} from 'react';
import {connect} from 'react-redux';
import Dialogs from './Dialogs';
import Preloader from '../Common/Preloader/Preloader';
import {compose} from 'redux';
import {actions} from '../../redux/dialog-reducer';
import {AppStateType} from '../../redux/redux-store';
import {MessageType, SimpleNameObjType} from '../../types/types';
import withAuthRedirect from '../HOC/withAuthRedirect';

type PropsType = {
    isFetching: boolean,
    dialogs: Array<SimpleNameObjType>,
    messages: Array<MessageType>,
    sendMsg: (text: string) => Promise<void>
}

class DialogsContainer extends React.Component<PropsType> {

    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Dialogs
                dialogs={this.props.dialogs}
                messages={this.props.messages}
                sendMsg={this.props.sendMsg}
            />
        </>
    }
}

let mapStateToProps = (state: AppStateType) => ({
    dialogs: state.dialogPage.dialogs,
    messages: state.dialogPage.messages,
});

export default compose<ComponentType>(connect(
    mapStateToProps,
    {sendMsg: actions.sendMsg}
), withAuthRedirect)(DialogsContainer);
