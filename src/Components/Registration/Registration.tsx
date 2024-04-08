import React, {useEffect} from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

import styles from './Registration.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {useForm} from 'react-hook-form';
import {Link, Navigate} from 'react-router-dom';
import {getAuthErrors, getGlobalError, getIsAuth, getIsFetching} from '../../redux/auth/auth-selectors';
import {registerUser} from '../../redux/auth/auth-thunks';
import {authActions} from '../../redux/auth/auth-slice';

export type RegisterDataType = {
    firstName: string,
    secondName: string,
    email: string,
    password: string,
}

export const Registration = () => {

    const isAuth = useSelector(getIsAuth);
    const isFetching = useSelector(getIsFetching);
    const authErrors = useSelector(getAuthErrors);
    const globalError = useSelector(getGlobalError);

    const {register, handleSubmit, setError, clearErrors, formState: {errors, isValid}} = useForm({
        defaultValues: {
            firstName: 'Testov',
            secondName: 'Test',
            email: 'test@test.ru',
            password: '12345'
        },
        mode: 'onChange'
    });

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(authActions.setGlobalError(''));
        clearErrors();
        Object.keys(authErrors).forEach(err => {
            setError(`root.${err}`,
                {message: authErrors[err]},
                {shouldFocus: true}
            )
        });
    }, [authErrors, dispatch])

    const handleOnChange = () => {
        clearErrors();
        dispatch(authActions.setErrors({}));
        dispatch(authActions.setGlobalError(''));
    }

    const onSubmit = (formData: RegisterDataType) => {
        dispatch(registerUser({userData: formData}));
    };

    if(isAuth) {
        return <Navigate to="/"/>
    }

    return (
        <Paper classes={{root: styles.root}}>
            <Typography classes={{root: styles.title}} variant="h5">
                Создать аккаунт
            </Typography>
            <div className={styles.avatar}>
                <Avatar sx={{width: 100, height: 100}}/>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} onChange={handleOnChange}>
                <TextField
                    className={styles.field}
                    required
                    label="Фамилия"
                    fullWidth
                    error={Boolean(errors.firstName?.message)}
                    helperText={errors.firstName?.message}
                    {...register('firstName', {required: 'Обязательно для заполнения'})}
                />
                <TextField
                    className={styles.field}
                    required
                    label="Имя"
                    fullWidth
                    error={Boolean(errors.secondName?.message)}
                    helperText={errors.secondName?.message}
                    {...register('secondName', {required: 'Обязательно для заполнения'})}
                />
                <TextField
                    className={styles.field}
                    required
                    label="Электронная почта"
                    fullWidth
                    error={Boolean(errors.email?.message) || !!authErrors['email']}
                    helperText={errors.email?.message || authErrors['email']}
                    {...register('email', {required: 'Обязательно для заполнения'})}
                />
                <TextField
                    className={styles.field}
                    required
                    label="Пароль"
                    fullWidth
                    error={Boolean(errors.password?.message)}
                    helperText={errors.password?.message}
                    {...register('password', {required: 'Обязательно для заполнения'})}
                />

                <span className={styles.error}>{globalError}</span>

                <Button type={"submit"} size="large" disabled={!isValid || isFetching}
                        variant="contained" fullWidth>
                    Зарегистрироваться
                </Button>
            </form>
            <Link className={styles.link} to={'/login'}>Войти в аккаунт</Link>
        </Paper>
    );
};
