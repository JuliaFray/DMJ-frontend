import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {login} from '../../redux/auth/auth-thunks'
import {Link, Navigate} from 'react-router-dom';
import {getIsAuth} from '../../redux/auth/auth-selectors';
import {Button, Container, Paper, Typography} from '@mui/material';
import TextField from "@mui/material/TextField";
import styles from "./Login.module.scss";
import {useForm} from 'react-hook-form';
import {ILoginData} from '../../types/types';
import {useAppSelector} from '../../hook/hooks';

export const Login: React.FC = () => {

    const {register, handleSubmit, formState: {errors, isValid}} = useForm({
        defaultValues: {
            email: 'test5@test.ru',
            password: '12345'
        },
        mode: 'onChange'
    });
    const isAuth = useSelector(getIsAuth);

    const dispatch = useDispatch();

    const onSubmit = (formData: ILoginData) => {
        dispatch(login({userData: formData}));
    };

    if(isAuth) {
        return <Navigate to={`/posts`}/>
    }

    return (
        <Container style={{height: "100vh"}}>
            <Paper classes={{root: styles.root}}>
                <Typography classes={{root: styles.title}} variant="h5">
                    Вход в аккаунт
                </Typography>
                <form onSubmit={handleSubmit((values: ILoginData) => onSubmit(values))}>
                    <TextField
                        className={styles.field}
                        label='E-mail'
                        fullWidth
                        error={Boolean(errors.email?.message)}
                        helperText={errors.email?.message}
                        {...register('email', {required: 'Обязательно для заполнения'})}
                    />

                    <TextField
                        className={styles.field}
                        label='Пароль'
                        fullWidth
                        error={Boolean(errors.password?.message)}
                        helperText={errors.password?.message}
                        {...register('password', {required: 'Обязательно для заполнения'})}/>


                    <Button type={'submit'} size='large' disabled={!isValid}
                            variant='contained' fullWidth>
                        Войти
                    </Button>
                </form>
                <Link className={styles.link} to={'/register'}>Создать аккаунт</Link>
            </Paper>
        </Container>
    )
};

