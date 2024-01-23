import React from 'react';
import LoginForm, {FormDataType} from './LoginForm'
import {useDispatch, useSelector} from 'react-redux';
import {login} from '../../redux/auth-reducer'
import {Redirect} from 'react-router-dom';
import StyleSheet from './../Common/FormsControls/FormControls.module.css';
import {getAuthId, getCaptchaUrl, getIsAuth} from '../../redux/auth-selectors';

export const Login: React.FC = () => {

    const captchaUrl = useSelector(getCaptchaUrl);
    const isAuth = useSelector(getIsAuth);
    const userId = useSelector(getAuthId);

    const dispatch = useDispatch();

    const onSubmit = (formData: FormDataType) => {
        dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha))
    };

    if (isAuth) {
        return <Redirect to={`/${userId}`}/>
    }

    return (
        <div className={StyleSheet.form}>
            <h1>Войти в аккаунт</h1>
            {/*<p>*/}
            {/*    Login : free@samuraijs.com*/}
            {/*</p>*/}
            <p>
                Login : test5@test.ru
            </p>
            {/*<p>*/}
            {/*    Password : free*/}
            {/*</p>*/}
            <p>
                Password : 12345
            </p>
            <LoginForm onSubmit={onSubmit} captchaUrl={captchaUrl}/>
        </div>
    )
};

