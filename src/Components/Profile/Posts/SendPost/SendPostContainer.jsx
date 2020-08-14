import { addPostActionCreator, updateNewPostTextActionCreator } from '../../../../redux/profile-reducer';
import SendPost from './SendPost';
import {connect} from 'react-redux';

let mapStateToProps = (state) => {
  return {
    newPostText : state.profilePage.newPostText
  };
}

let mapDispatchToProps = (dispatch) => {
  return {
    addpost : () => {dispatch(addPostActionCreator());},
    updateNewPostText : (text) => {dispatch(updateNewPostTextActionCreator(text))},
  }
}


const SendPostContainer = connect(mapStateToProps, mapDispatchToProps)(SendPost);

export default SendPostContainer;