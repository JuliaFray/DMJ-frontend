import React from 'react';
import { connect } from 'react-redux';
import Dialogs from './Dialogs';
import Preloader from './../Common/Preloader/Preloader';
import withAithRedirect from './../HOC/WithAuthRedirect'
import { compose } from 'redux';
import { addMsgActionCreator } from './../../redux/dialog-reducer';

class DialogsContainer extends React.Component {

    render() {
        // debugger
        return <>
            {this.props.isFetching ? <Preloader /> : null}
            <Dialogs
                dialogs={this.props.dialogs}
                messages={this.props.messages}
                sengMsg={this.props.sengMsg}
            />
        </>
    }
};

let mapStateToProps = (state) => ({
    dialogs: state.messagePage.dialogs,
    messages: state.messagePage.messages,
});

let mapDispatchToProps = (dispatch) => {
    return {
        sengMsg: (message) => {
            dispatch(addMsgActionCreator(message))
        }
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAithRedirect
)(DialogsContainer);