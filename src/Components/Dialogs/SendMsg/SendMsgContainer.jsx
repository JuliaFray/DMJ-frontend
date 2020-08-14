import { addMsgActionCreator } from '../../../redux/dialog-reducer';
import SendMsgForm from './SendMsg';
import {connect} from 'react-redux';




let mapStateToProps = (state) => {
  return {
    newMsgText : state.messagePage.newMsgText
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    addmsg : () => {dispatch(addMsgActionCreator());}
  }
}



const SendMsgContainer = connect(mapStateToProps, mapDispatchToProps)(SendMsgForm);

export default SendMsgContainer;