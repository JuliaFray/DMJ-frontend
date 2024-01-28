import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';

import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';
import {Link, useNavigate, useParams} from "react-router-dom";
import {useForm} from "react-hook-form";
import {useAppDispatch} from "../../../hook/hooks";
import {createPost, editPost, getOnePost} from "../../../redux/posts/posts-thunks";

export const AddPost = () => {

    const dispatch = useAppDispatch();
    const inputRef = useRef();
    const navigate = useNavigate();
    const {handleSubmit} = useForm({
        defaultValues: {},
        mode: 'onChange'
    });

    const {id} = useParams();

    useEffect(() => {
        if (id) {
            dispatch(getOnePost({postId: id}))
                .then(res => {
                        const post = res.payload;
                        setTitle(post.title);
                        setText(post.text);
                        setTags(post.tags);
                        setImageUrl(post.imageUrl);
                    }
                )
        }
    }, [])

    const [text, setText] = useState('');
    const [title, setTitle] = useState('');
    const [tags, setTags] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const handleChangeFile = async (event) => {
        try {
            const formData = new FormData();
            formData.append('image', event.target.files[0]);
            // const {data} = await axios.post('/upload', formData);
            // setImageUrl(data.url);
        } catch (err) {
            console.warn(err);
            alert('Ошибка при загрузке файла');
        }
    };

    const onClickRemoveImage = () => {
        setImageUrl('');
    };

    const onChange = useCallback((value) => {
        setText(value);
    }, []);

    const onSubmit = async () => {
        const fields = {
            title,
            text,
            tags: tags.toString(),
            imageUrl
        }
        if (id) {
            dispatch(editPost({post: fields, id: id}))
                .then(res => {
                    navigate('/posts')
                });
        } else {
            dispatch(createPost({post: fields}))
                .then(res => {
                    navigate(`/posts/${res.payload._id}`);
                });
        }

    }

    const options = useMemo(
        () => ({
            spellChecker: false,
            maxHeight: '400px',
            autofocus: true,
            placeholder: 'Введите текст...',
            status: false,
            autosave: {
                enabled: true,
                delay: 1000,
            },
        }),
        [],
    );

    return (
        <Paper style={{padding: 30}}>
            <form onSubmit={handleSubmit(onSubmit)}>
                {!imageUrl && (
                    <Button variant="outlined" size="large" onClick={() => inputRef.current.click()}>
                        Загрузить превью
                    </Button>
                )}
                <input ref={inputRef} type="file" onChange={handleChangeFile} hidden/>
                {!!imageUrl && (
                    <Button variant="contained" color="error" onClick={onClickRemoveImage}>
                        Удалить
                    </Button>
                )}
                {!!imageUrl && (
                    <img className={styles.image} src={imageUrl.includes('http')
                        ? imageUrl : `http://localhost:8000${imageUrl}`} alt="Uploaded"/>
                )}
                <br/>
                <br/>
                <TextField
                    classes={{root: styles.title}}
                    variant="standard"
                    placeholder="Заголовок статьи..."
                    fullWidth
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                <TextField classes={{root: styles.tags}}
                           variant="standard" placeholder="Тэги" fullWidth
                           value={tags}
                           onChange={e => setTags(e.target.value)}/>
                <SimpleMDE className={styles.editor} value={text} onChange={onChange} options={options}/>
                <div className={styles.buttons}>
                    <Button type='submit' size="large" variant="contained">
                        {!!id ? 'Сохранить' : 'Опубликовать'}
                    </Button>
                    <Link to="/posts">
                        <Button size="large">Отмена</Button>
                    </Link>
                </div>
            </form>
        </Paper>
    );
};
