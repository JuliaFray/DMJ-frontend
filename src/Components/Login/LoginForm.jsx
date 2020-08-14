import React from 'react';
import { reduxForm } from 'redux-form';
import { Field } from 'redux-form';
import { requiredField } from './../../Utils/Validators/validator';
import { Input, createField } from './../Common/FormsControls/FormsControls';
import StyleSheet from './../Common/FormsControls/FormControls.module.css';


// let maxLength10 = maxLengthCreator(10)

const LoginForm = ({ handleSubmit, error }) => {
    return (
        <div >
            <form onSubmit={handleSubmit} >
                {createField('Login', 'email', [requiredField], Input)}
                {createField('Passwowd', 'password', [requiredField], Input, 'password')}
                {createField(null, 'rememberMe', [], Input, 'checkbox', 'Remember me')} 

                {error && <div className={StyleSheet.summaryError}> {error} </div>}

                <div className = {StyleSheet.btn}>
                    <button>Login</button>
                </div>
            </form>
        </div>
    )
}

const reduxLoginForm = reduxForm({
    form: 'login'
})(LoginForm);

export default reduxLoginForm;