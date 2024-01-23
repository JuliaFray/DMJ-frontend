import React from 'react';
import StyleSheet from './SendPost.module.css';
import {InjectedFormProps, reduxForm} from 'redux-form';
import {maxLengthCreator, requiredField} from '../../../../Utils/Validators/validator';
import {createField, GenericFormDataKeys, Input} from '../../../Common/FormsControls/FormsControls';

let maxLength100 = maxLengthCreator(100);

export type FormDataType = {
    newPostText: string
}

type FormDataKeys = GenericFormDataKeys<FormDataType>

const SendPostForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {

    return (
        <form className={StyleSheet.sendMsg} onSubmit={props.handleSubmit}>
            {createField<FormDataKeys>('Введите текст...', 'newPostText', [requiredField, maxLength100], Input)}
            <button>Опубликовать</button>
        </form>
    )
};

const reduxPostForm = reduxForm<FormDataType>({
    form: 'posts'
})(SendPostForm);

export default reduxPostForm;
