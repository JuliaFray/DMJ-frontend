import React from "react";
import SendIcon from '@mui/icons-material/Send';
import Avatar from "@mui/material/Avatar";
import IconButton from '@mui/material/IconButton';
import TextField from "@mui/material/TextField";
import {FieldValues, useForm} from "react-hook-form";
import {useDispatch, useSelector} from 'react-redux';
import {createPostComment} from '../../../../redux/posts/posts-thunks';
import {getMyProfileAvatar, getMyProfileFullName} from "../../../../redux/profile/profile-selectors";
import {NO_AVATAR} from '../../../../Utils/DictConstants';
import styles from "../Comment.module.scss";

export type ICommentCreate = {
    postId: string
}

export const AddCommentComponent: React.FC<ICommentCreate> = ({postId}) => {

    const dispatch = useDispatch();

    const {register, handleSubmit, resetField} = useForm({
        mode: 'onChange'
    });

    const avatar = useSelector(getMyProfileAvatar);
    const fullName = useSelector(getMyProfileFullName);

    const onSubmit = (formData: FieldValues) => {
        dispatch(createPostComment(
            {
                comment: {
                    text: formData.text
                },
                postId
            }));
        resetField('text');
    };

    return (
        <>
            <div className={styles.root}>
                <Avatar className={styles.avatar}
                        src={(avatar && `data:image/jpeg;base64,${avatar.data}`) || NO_AVATAR}
                        alt={fullName}/>
                <form className={styles.form} onSubmit={handleSubmit((values) => onSubmit(values))}>
                    <TextField
                        label="Написать комментарий"
                        variant="outlined"
                        maxRows={10}
                        multiline
                        fullWidth
                        {...register('text')}
                    />
                    <IconButton className={styles.btn} type={'submit'} color='primary'>
                        <SendIcon/>
                    </IconButton>
                </form>
            </div>
        </>
    );
};
