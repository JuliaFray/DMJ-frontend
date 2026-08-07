import React, { FC, Fragment, useState } from 'react';

import { Form, Formik } from 'formik';
import { Link } from 'react-router-dom';

import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, IconButton, InputAdornment, Snackbar, Stack } from '@mui/material';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import { useAppSelector } from 'shared/hook';
import { pathKeys } from 'shared/lib';
import { authSelector } from 'shared/model';
import { InputWrapper, Spinner } from 'shared/ui';

import { useRegister } from './register-page.hook';
import styles from './register-page.module.scss';

export const RegisterPage: FC = () => {
  const {
    initialData,
    validation,
    handleSubmit,
    isFetching,
    globalError,
    handleOnChange,
    handleClose,
  } = useRegister();

  const showSuccessSend = useAppSelector(authSelector.getSuccessSend);

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMousePassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <>
      <Paper classes={{ root: styles.root }}>
        <Stack spacing={1}>
          <Typography classes={{ root: styles.title }} variant='h5'>
            Создать аккаунт
          </Typography>

          <Spinner display={isFetching} position='over' />

          <Formik
            initialValues={{ ...initialData }}
            onSubmit={(values) => handleSubmit(values)}
            validateOnChange
            validationSchema={validation}
            enableReinitialize
          >
            {({ isValid }) => (
              <Form onChange={handleOnChange}>
                <Stack spacing={1}>
                  <InputWrapper name='login' label='Логин' className={styles.field} />
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

          <Link className={styles.link} to={pathKeys.login()}>
            Войти в аккаунт
          </Link>
        </Stack>
      </Paper>

      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={showSuccessSend}
        autoHideDuration={6000}
        onClose={handleClose}
        message='Письмо отправлено на ваш адрес электронной почты'
        ContentProps={{
          sx: {
            background: '#C8C3C9',
            color: 'white',
          },
        }}
        sx={{
          height: '100%',
          width: '100%',
          zIndex: '1000',
          backgroundColor: 'rgba(255, 255, 255, 0.3)',
          backdropFilter: 'blur(2px)',
          marginTop: '-25px',
        }}
      />
    </>
  );
};
