import React from 'react';
import {reduxForm} from 'redux-form';
import {requiredField} from './../../Utils/Validators/validator';
import {createField, Input} from './../Common/FormsControls/FormsControls';
import StyleSheet from './../Common/FormsControls/FormControls.module.css';

const LoginForm = ({handleSubmit, error}) => {
	return (
		<div>
			<form onSubmit={handleSubmit}>
				{createField('Login', 'email', [requiredField], Input)}
				{createField('Passwowd', 'password', [requiredField], Input, 'password')}
				{createField(null, 'rememberMe', [], Input, 'checkbox', 'Remember me')}

				{error && <div className={StyleSheet.summaryError}> {error} </div>}

				<div className={StyleSheet.btn}>
					<button>Login</button>
				</div>
			</form>
		</div>
	)
};

const reduxLoginForm = reduxForm({
	form: 'login'
})(LoginForm);

export default reduxLoginForm;
