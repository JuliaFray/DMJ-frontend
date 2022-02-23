import React, {ComponentType} from 'react';
import LoginForm, {FormDataType} from './LoginForm'
import {connect} from 'react-redux';
import {login} from '../../redux/auth-reducer'
import {Redirect} from 'react-router-dom';
import StyleSheet from './../Common/FormsControls/FormControls.module.css';
import {AppStateType} from "../../redux/redux-store";
import {compose} from 'redux';

type MapStatePropsType = {
    isAuth: boolean,
    captchaUrl: string | null
}

type MapDispatchPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string | null) => void
}

type PropsType = MapStatePropsType & MapDispatchPropsType;

const Login: React.FC<PropsType> = (props) => {

    const onSubmit = (formData: FormDataType) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    };

    if(props.isAuth) {
        return <Redirect to={'/profile'}/>
    }

    return (
        <div className={StyleSheet.form}>
            <h1>Login</h1>
            <p>
                Login : free@samuraijs.com
            </p>
            <p>
                Password : free
            </p>
            <LoginForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
        </div>
    )
};

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    captchaUrl: state.auth.captchaUrl,
    isAuth: state.auth.isAuth
});

export default compose<ComponentType>(
    connect<MapStatePropsType, {}, PropsType, AppStateType>(
        mapStateToProps,
        {login})
)(Login);

