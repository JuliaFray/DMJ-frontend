import React from 'react';
import StyleSheet from './SendMsg.module.css';
import {InjectedFormProps, reduxForm} from 'redux-form';
import {maxLengthCreator, requiredField} from '../../../Utils/Validators/validator';
import {createField, GenericFormDataKeys, Input} from '../../Common/FormsControls/FormsControls';

let maxLength100 = maxLengthCreator(100);

export type FormDataType = {
    message: string
}
type FormDataKeys = GenericFormDataKeys<FormDataType>;

const SendMsgForm: React.FC<InjectedFormProps<FormDataType>> = ({handleSubmit}) => {

    return (
        <form className={StyleSheet.sendMsg} onSubmit={handleSubmit}>
            {createField<FormDataKeys>('Your message...', 'message', [requiredField, maxLength100], Input)}
            <button>Send</button>
        </form>
    )
};

const reduxMessageForm = reduxForm<FormDataType>({
    form: 'message'
})(SendMsgForm);

export default reduxMessageForm;
