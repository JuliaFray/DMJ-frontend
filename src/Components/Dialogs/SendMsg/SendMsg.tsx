import React from 'react';
import {useForm} from 'react-hook-form';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import {Box} from '@mui/material';
import styles from './SendMsg.module.scss'
import Divider from '@mui/material/Divider';

const SendMsgForm: React.FC = () => {

    const {register, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {text: ''},
        mode: 'onChange'
    });

    const onSubmit = (formData: any) => {
        console.log(formData);
    };

    return (
        <Box className={styles.sendMsg}>
            <Divider sx={{marginBottom: '20px'}}/>

            <form className={styles.sendForm} onSubmit={handleSubmit((values: any) => onSubmit(values))}>
                <TextField
                    variant={'outlined'}
                    className={styles.field}
                    placeholder={'Введите сообщение'}
                    fullWidth
                    error={Boolean(errors.text?.message)}
                    helperText={errors.text?.message}
                    {...register('text', {maxLength: 100})}
                />


                <IconButton  className={styles.btn} type={'submit'} color='primary'>
                    <SendIcon/>
                </IconButton>
            </form>
        </Box>

    )
};

export default SendMsgForm;
