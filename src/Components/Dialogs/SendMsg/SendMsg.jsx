import React from 'react';
import StyleSheet from './SendMsg.module.css';
import { reduxForm } from 'redux-form';
import {Field} from 'redux-form';
import { requiredField, maxLengthCreator } from './../../../Utils/Validators/validator';
import { Input } from './../../Common/FormsControls/FormsControls';

let maxLength100 = maxLengthCreator(100)

const SendMsgForm = (props) => {

  return (
    <form className={StyleSheet.sendMsg} onSubmit = {props.handleSubmit}>
      <Field placeholder={'Your message...'} component = {Input} name = {'message'} validate={[requiredField, maxLength100]} />

      <button>Send</button>
    </form>
  )
}

const reduxMessageForm = reduxForm({
  form: 'message'
})(SendMsgForm);

export default reduxMessageForm;