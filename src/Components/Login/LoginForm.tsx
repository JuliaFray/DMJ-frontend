import React from 'react';
import {InjectedFormProps, reduxForm} from 'redux-form';
import {requiredField} from '../../Utils/Validators/validator';
import {createField, GenericFormDataKeys, Input} from '../Common/FormsControls/FormsControls';
import StyleSheet from './../Common/FormsControls/FormControls.module.css';

type PropsType = {
    captchaUrl: string | null
}

export type LoginDataType = {
    email: string,
    password: string,
    rememberMe?: boolean,
    captcha?: string | null
}

type FormDataKeys = GenericFormDataKeys<LoginDataType>;

const LoginForm: React.FC<InjectedFormProps<LoginDataType, PropsType> & PropsType> = (
    {handleSubmit, error, captchaUrl}
) => {
    return (
        <div>
            <form onSubmit={handleSubmit}>
                {createField<FormDataKeys>('Login', 'email', [requiredField], Input)}
                {createField<FormDataKeys>('Password', 'password', [requiredField], Input, 'password')}
                {/*{createField<FormDataKeys>('', 'rememberMe', [], CheckBox, 'checkbox', 'Remember me')}*/}

                {captchaUrl && <img alt='captchaUrl' src={captchaUrl}/>}
                {captchaUrl && createField<FormDataKeys>('Enter symbols...', 'captcha', [requiredField], Input)}

                {error && <div className={StyleSheet.summaryError}> {error} </div>}

                <div className={StyleSheet.btn}>
                    <button>Войти</button>
                </div>
            </form>
        </div>
    )
};

const reduxLoginForm = reduxForm<LoginDataType, PropsType>({
    form: 'login'
})(LoginForm);

export default reduxLoginForm;
