import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {login} from '../../redux/auth/auth-thunks'
import {Link, Navigate} from 'react-router-dom';
import {getAuthId, getGlobalError, getIsAuth, getIsFetching} from '../../redux/auth/auth-selectors';
import {Button, Container, Paper, Typography} from '@mui/material';
import TextField from '@mui/material/TextField';
import styles from './Login.module.scss';
import {useForm} from 'react-hook-form';
import {ILoginData} from '../../types/types';
import {authActions} from '../../redux/auth/auth-slice';
import useWebSocket from '../../hook/hooks';
import {SocketEvents} from '../../Utils/DictConstants';

export const Login: React.FC = () => {

    const {register, handleSubmit, formState: {errors, isValid}} = useForm({
        defaultValues: {email: '', password: ''},
        mode: 'onChange'
    });
    const isAuth = useSelector(getIsAuth);
    const isFetching = useSelector(getIsFetching);
    const globalError = useSelector(getGlobalError);
    const authId = useSelector(getAuthId);

    const ws = useWebSocket();

    useEffect(() => {
        if(authId) {
            ws?.send(JSON.stringify({type: SocketEvents.AUTH_EVENT, id: authId}));
        }
    }, [authId])

    const dispatch = useDispatch();

    const onSubmit = (formData: ILoginData) => {
        dispatch(login({userData: formData}));
    };

    const handleChange = () => {
        dispatch(authActions.setGlobalError(''))
    }

    if(isAuth) {
        return <Navigate to={`/posts`}/>
    }

    return (
        <Container style={{height: '100%'}}>
            <Paper classes={{root: styles.root}}>
                <Typography classes={{root: styles.title}} variant='h5'>
                    Вход в аккаунт
                </Typography>
                <form onChange={handleChange} onSubmit={handleSubmit((values: ILoginData) => onSubmit(values))}>
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

                    <span className={styles.error}>{globalError}</span>

                    <Button type={'submit'} size='large' disabled={!isValid || isFetching}
                            variant='contained' fullWidth>
                        Войти
                    </Button>
                </form>
                <Link className={styles.link} to={'/register'}>Создать аккаунт</Link>
            </Paper>
        </Container>
    )
};

