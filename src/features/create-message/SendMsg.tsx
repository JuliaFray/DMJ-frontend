import React from 'react';
import SendIcon from '@mui/icons-material/Send';
import {Box} from '@mui/material';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import {TDialog} from 'entities/message';
import {useForm} from 'react-hook-form';
import {useSelector} from 'react-redux';
import useWebSocket from 'shared/hook/hooks';
import {SocketEvents} from 'shared/lib/DictConstants';
import {getAuthId} from 'shared/model/auth/auth-selectors';
import styles from './SendMsg.module.scss'


type ISendMsg = {
    selectedDialog: TDialog
}

const SendMsg: React.FC<ISendMsg> = (props, context) => {

    const authId = useSelector(getAuthId);

    const ws = useWebSocket();


    const {register, handleSubmit, resetField, formState: {errors}} = useForm({
        defaultValues: {text: ''},
        mode: 'onChange'
    });

    const onSubmit = (formData: any) => {
        props.selectedDialog.users
            .filter(u => u._id !== authId)
            .forEach(u => {
                const msg = {
                    type: SocketEvents.MSG_EVENT,
                    from: authId,
                    to: u._id,
                    text: formData.text,
                    dialogId: props.selectedDialog._id
                };
                ws?.send(JSON.stringify({type: SocketEvents.MSG_EVENT, msg: msg}));
            })

        resetField('text');
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


                <IconButton className={styles.btn} type={'submit'} color='primary'>
                    <SendIcon/>
                </IconButton>
            </form>
        </Box>

    )
};

export default SendMsg;
