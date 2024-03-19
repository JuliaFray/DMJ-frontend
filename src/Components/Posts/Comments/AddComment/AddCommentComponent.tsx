import React from "react";
import {useDispatch, useSelector} from 'react-redux';
import styles from "./AddComment.module.scss";

import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import {getProfileAvatar, getProfileFullName} from "../../../../redux/profile/profile-selectors";
import {FieldValues, useForm} from "react-hook-form";
import {createPostComment} from '../../../../redux/posts/posts-thunks';
import {NO_AVATAR} from '../../../../Utils/DictConstants';

export type ICommentCreate = {
    postId: string
}

export const AddCommentComponent: React.FC<ICommentCreate> = ({postId}) => {

    const dispatch = useDispatch();

    const {register, handleSubmit, resetField} = useForm({
        mode: 'onChange'
    });

    const avatarUrl = useSelector(getProfileAvatar);
    const fullName = useSelector(getProfileFullName);

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
                <Avatar className={styles.avatar} src={avatarUrl || NO_AVATAR} alt={fullName}/>
                <form className={styles.form} onSubmit={handleSubmit((values) => onSubmit(values))}>
                    <TextField
                        label="Написать комментарий"
                        variant="outlined"
                        maxRows={10}
                        multiline
                        fullWidth
                        {...register('text')}
                    />
                    <Button type={'submit'} variant="contained">Отправить</Button>
                </form>
            </div>
        </>
    );
};
