import React, { useState } from 'react';

import { Form, Formik } from 'formik';
import { Link, Navigate } from 'react-router-dom';

import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Button, IconButton, InputAdornment, Paper, Stack, Typography } from '@mui/material';

import { pathKeys } from 'shared/lib';
import { InputWrapper } from 'shared/ui';

import { useLogin } from './login-page.hook';
import styles from './login-page.module.scss';

export const LoginPage: React.FC = () => {
  const { initialData, validation, handleSubmit, isAuth, isFetching, globalError } = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  if (isAuth) {
    return <Navigate to='/' />;
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Stack spacing={2}>
        <Typography classes={{ root: styles.title }} variant='h5'>
          Войти в аккаунт
        </Typography>

        <Formik
          initialValues={{ ...initialData }}
          onSubmit={(values) => handleSubmit(values)}
          validationSchema={validation}
          enableReinitialize
        >
          {({ isValid }) => (
            <Form>
              <InputWrapper name='email' label='Email' className={styles.field} />
              <InputWrapper
                name='password'
                label='Пароль'
                className={styles.field}
                type={showPassword ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label={showPassword ? 'hide the password' : 'display the password'}
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        onMouseUp={handleMouseUpPassword}
                        edge='end'
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <span className={styles.error}>{globalError}</span>

              <Button
                type='submit'
                size='large'
                disabled={!isValid || isFetching}
                variant='contained'
                fullWidth
              >
                Войти
              </Button>
            </Form>
          )}
        </Formik>

        <Link className={styles.link} to={pathKeys.register()}>
          Создать аккаунт
        </Link>
      </Stack>
    </Paper>
  );
};
