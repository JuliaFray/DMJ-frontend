import React, {ChangeEvent, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';
import styles from './AddPost.module.scss';
import 'easymde/dist/easymde.min.css';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import {useAppDispatch} from '../../../hook/hooks';
import {createPost, editPost, getOnePost} from '../../../redux/posts/posts-thunks';
import instance from '../../../api/api';
import {IPost, IPostEdit} from '../../../types/types';

export const AddPost: React.FC = () => {

    const dispatch = useAppDispatch();
    const inputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const {handleSubmit} = useForm({
        defaultValues: {},
        mode: 'onChange'
    });

    const {id} = useParams();

    useEffect(() => {
        if(id) {
            dispatch(getOnePost({postId: id}))
                .then(res => {
                        const post = res.payload;
                        if(post && typeof post !== 'string') {
                            const p: IPost = post;
                            setTitle(p.title);
                            setText(p.text);
                            setTags(p.tags?.toString() || '');
                        }
                    }
                )
        }
    }, [])

    const [text, setText] = useState('');
    const [title, setTitle] = useState('');
    const [tags, setTags] = useState<string>('');
    const [imageData, setImageData] = useState<Record<string, any>>({});

    const handleChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
        const files = (event.target as HTMLInputElement).files;
        if(files) {
            try {
                const formData = new FormData();
                formData.append('image', files[0]);
                const {data} = await instance.post(`/upload`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                const image = await instance.get(`/image/${data.id}`);
                const res = Object.assign(data, image.data.file[0])
                setImageData(res);
            } catch(err) {
                console.warn(err);
                alert('Ошибка при загрузке файла');
            }
        }
    };

    const onClickRemoveImage = () => {
        setImageData({});
    };

    const onChange = useCallback((value: React.SetStateAction<string>) => {
        setText(value);
    }, []);

    const onSubmit = async () => {
        const fields: IPostEdit = {
            title,
            text,
            tags: tags.toString(),
            imageId: imageData.id
        }
        if(id) {
            dispatch(editPost({post: fields, id: id}))
                .then(res => {
                    navigate('/posts')
                });
        } else {
            dispatch(createPost({post: fields}))
                .then(res => {
                    if(typeof res.payload !== 'string') {
                        navigate(`/posts/${res.payload?._id}`);
                    }
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
                uniqueId: 'addPost'
            },
        }),
        [],
    );

    const image = `data:image/jpeg;base64,${imageData?.data}`;

    return (
        <Paper style={{padding: 30}}>
            <form onSubmit={handleSubmit(onSubmit)}>
                {!imageData.id && (
                    <Button variant='outlined' size='large' onClick={() => inputRef.current?.click()}>
                        Загрузить превью
                    </Button>
                )}
                <input ref={inputRef} type='file' onChange={handleChangeFile} hidden/>
                {!!imageData.id && (
                    <Button variant='contained' color='error' onClick={onClickRemoveImage}>
                        Удалить
                    </Button>
                )}
                {!!imageData.id && (<img className={styles.image} src={image}></img>)}
                <br/>
                <br/>
                <TextField
                    classes={{root: styles.title}}
                    variant='standard'
                    placeholder='Заголовок статьи...'
                    fullWidth
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                <TextField classes={{root: styles.tags}}
                           variant='standard' placeholder='Тэги' fullWidth
                           value={tags}
                           onChange={e => setTags(e.target.value)}/>
                <SimpleMDE className={styles.editor} value={text} onChange={onChange}
                           options={options}/>
                <div className={styles.buttons}>
                    <Button type='submit' size='large' variant='contained'>
                        {!!id ? 'Сохранить' : 'Опубликовать'}
                    </Button>
                    <Link to='/posts'>
                        <Button size='large'>Отмена</Button>
                    </Link>
                </div>
            </form>
        </Paper>
    );
};
