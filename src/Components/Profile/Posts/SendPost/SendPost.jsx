import React from 'react';
import StyleSheet from './SendPost.module.css';
import { reduxForm } from 'redux-form';
import { Field } from 'redux-form';
import { requiredField, maxLengthCreator } from '../../../../Utils/Validators/validator';
import { Input } from '../../../Common/FormsControls/FormsControls';

let maxLength10 = maxLengthCreator(10)

const SendPost = (props) => {

  return (
    <form className={StyleSheet.sendMsg} onSubmit={props.handleSubmit}>
      <Field
        placeholder={'Your news...'} component={Input}
        name={'posts'} validate={[requiredField, maxLength10]} />
      <button>Send</button>
    </form>
  )
}

const reduxPostForm = reduxForm({
  form: 'posts'
})(SendPost);

export default reduxPostForm;