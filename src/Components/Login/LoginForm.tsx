import React from 'react';
import {InjectedFormProps, reduxForm} from 'redux-form';
import {requiredField} from '../../Utils/Validators/validator';
import {CheckBox, createField, GenericFormDataKeys, Input} from '../Common/FormsControls/FormsControls';
import StyleSheet from './../Common/FormsControls/FormControls.module.css';

type PropsType = {
    captchaUrl: string | null
}

export type FormDataType = {
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: string | null
}

type FormDataKeys = GenericFormDataKeys<FormDataType>;

const LoginForm: React.FC<InjectedFormProps<FormDataType, PropsType> & PropsType> = (
    {handleSubmit, error, captchaUrl}
) => {
    return (
        <div>
            <form onSubmit={handleSubmit}>
                {createField<FormDataKeys>('Login', 'email', [requiredField], Input)}
                {createField<FormDataKeys>('Password', 'password', [requiredField], Input, 'password')}
                {createField<FormDataKeys>('', 'rememberMe', [], CheckBox, 'checkbox', 'Remember me')}

                {captchaUrl && <img alt='captchaUrl' src={captchaUrl}/>}
                {captchaUrl && createField<FormDataKeys>('Enter symbols...', 'captcha', [requiredField], Input)}

                {error && <div className={StyleSheet.summaryError}> {error} </div>}

                <div className={StyleSheet.btn}>
                    <button>Login</button>
                </div>
            </form>
        </div>
    )
};

const reduxLoginForm = reduxForm<FormDataType, PropsType>({
    form: 'login'
})(LoginForm);

export default reduxLoginForm;
