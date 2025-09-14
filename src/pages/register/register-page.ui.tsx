import React, { FC, useState } from 'react';

import { Form, Formik } from 'formik';
import { Link, Navigate } from 'react-router-dom';

import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment, Stack } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import { InputWrapper } from 'shared/ui';

import { useRegister } from './register-page.hook';
import styles from './register-page.module.scss';

export type RegisterDataType = {
  firstName: string;
  secondName: string;
  email: string;
  password: string;
};

export const RegisterPage: FC = () => {
  const { initialData, validation, handleSubmit, isAuth, isFetching, globalError } = useRegister();

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMousePassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  if (isAuth) {
    return <Navigate to='/' />;
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Stack spacing={1}>
        <Typography classes={{ root: styles.title }} variant='h5'>
          Создать аккаунт
        </Typography>
        <div className={styles.avatar}>
          <Avatar sx={{ width: 100, height: 100 }} />
        </div>

        <Formik
          initialValues={{ ...initialData }}
          onSubmit={(values) => handleSubmit(values)}
          validationSchema={validation}
          enableReinitialize
        >
          {({ isValid }) => (
            <Form>
              <Stack spacing={1}>
                <InputWrapper name='firstName' label='Фамилия' className={styles.field} />
                <InputWrapper name='secondName' label='Имя' className={styles.field} />
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
                          onMouseDown={handleMousePassword}
                          onMouseUp={handleMousePassword}
                          edge='end'
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Stack>

              <span className={styles.error}>{globalError}</span>

              <Button
                type='submit'
                size='large'
                disabled={!isValid || isFetching}
                variant='contained'
                fullWidth
              >
                Зарегистрироваться
              </Button>
            </Form>
          )}
        </Formik>

        <Link className={styles.link} to='/login'>
          Войти в аккаунт
        </Link>
      </Stack>
    </Paper>
  );
};
