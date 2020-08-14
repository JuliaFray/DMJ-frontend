import React from 'react';
import LoginForm from './LoginForm'
import { connect } from 'react-redux';
import {login} from './../../redux/auth-reducer'
import { Redirect } from 'react-router-dom';
import StyleSheet from './../Common/FormsControls/FormControls.module.css';

const Login = (props) => {

    const onSumbit = (formData) => {
        // console.log(formData)
        props.login(formData.email, formData.password, formData.rememberMe)
    }

    if (props.isAuth) {
        return <Redirect to = {'/profile'} />
    }

    return (
        <div className = {StyleSheet.form}>
            <h1>Login</h1>
            <LoginForm onSubmit={onSumbit} />
        </div>
    )
};

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {login} )(Login);