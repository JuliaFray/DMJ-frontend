import React, {ChangeEvent, useCallback, useEffect, useMemo, useState} from 'react';
import {useForm} from 'react-hook-form';
import {useSelector} from 'react-redux';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {compose} from 'redux';
import 'easymde/dist/easymde.min.css';
// eslint-disable-next-line import/order
import SimpleMDE from 'react-simplemde-editor';
import {useAppDispatch} from '../../../hook/hooks';
import {getPost} from '../../../redux/posts/posts-selectors';
import {postActions} from '../../../redux/posts/posts-slice'
import {createPost, editPost, getOnePost} from '../../../redux/posts/posts-thunks';
import {IChipData} from '../../../types/types';
import {convertBase64ToBlob} from '../../../Utils/helper';
import AutocompleteField from '../../Common/AutocompleteField/AutocompleteField';
import InputFileUpload from '../../Common/FileUploadButton/FileUploadButton';
import PageLayout from '../../Common/PageLayout/PageLayout';
import withAuthRedirect from '../../HOC/withAuthRedirect';
// eslint-disable-next-line import/order
import IconButton from '@mui/material/IconButton';
// eslint-disable-next-line import/order
import DeleteIcon from '@mui/icons-material/Clear';
// eslint-disable-next-line import/order
import TextField from '@mui/material/TextField';
// eslint-disable-next-line import/order
import Paper from '@mui/material/Paper';
// eslint-disable-next-line import/order
import Button from '@mui/material/Button';
// eslint-disable-next-line import/order
import {Tooltip} from '@mui/material';
import styles from './AddPost.module.scss';
// eslint-disable-next-line import/order
import clsx from 'clsx';

const AddPost: React.FC = () => {

    const {id} = useParams();

    const post = useSelector(getPost);

    const [text, setText] = useState('');
    const [title, setTitle] = useState('');
    const [tags, setTags] = useState<(string | IChipData)[]>([]);
    const [file, setFile] = useState<File | string | null>(null);

    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const {handleSubmit} = useForm({
        defaultValues: {},
        mode: 'onChange'
    });


    useEffect(() => {
        if(id) {
            dispatch(getOnePost({postId: id}));
            if(post) {
                setTitle(post.title);
                setText(post.text);
                setTags(post.tags);
                if(post.image) {
                    setFile(post.image.data)

                }
            }
        }
    }, [id])

    const handleChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
        const files = (event.target as HTMLInputElement).files;
        if(files?.length) {
            setFile(files[0]);
        }
    };

    const onClickRemoveImage = () => {
        setFile(null);
    };

    const onChange = useCallback((value: React.SetStateAction<string>) => {
        setText(value);
    }, []);

    const onSubmit = async () => {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('text', text);
        formData.append('tags', JSON.stringify(tags));

        if(file) {
            if(file instanceof File) {
                formData.append('image', file);
            } else {
                formData.append('image', convertBase64ToBlob(file));
            }
        }

        dispatch(postActions.clearPostState());

        if(id) {
            dispatch(editPost({file: formData, id: id}))
                .then(() => {
                    navigate('/posts')
                });
        } else {
            dispatch(createPost({file: formData}))
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

    const image = file
        ? typeof file === 'string'
            ? `data:image/jpeg;base64,${file}`
            : URL.createObjectURL(file)
        : '';

    return (
        <PageLayout isMainPage
                    mainChildren={<Paper style={{padding: 30}} className={clsx(styles.root, {[styles.rootFull]: true})}>
                        <form onSubmit={handleSubmit(onSubmit)}>

                            {!file && <InputFileUpload text={'Загрузить изображение'} onClick={handleChangeFile}/>}

                            {!!file &&
                                <div className={styles.editButtons}>
                                    <IconButton onClick={onClickRemoveImage} color='secondary'>
                                        <Tooltip title='Удалить изображение'>
                                            <DeleteIcon/>
                                        </Tooltip>
                                    </IconButton>
                                </div>
                            }
                            {!!file && (<img className={styles.image} src={image} alt={'postImage'}/>)}

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
                            <AutocompleteField values={tags} onChange={(val) => setTags(val)}/>
                            <SimpleMDE className={styles.editor} value={text} onChange={onChange}
                                       options={options}/>
                            <div className={styles.buttons}>
                                <Button type='submit' size='large' variant='contained'>
                                    {!!id ? 'Сохранить' : 'Опубликовать'}
                                </Button>
                                <Link to={!!id ? `/posts/${id}` : '/posts'}>
                                    <Button size='large'>Отмена</Button>
                                </Link>
                            </div>
                        </form>
                    </Paper>}/>


    );
};


export default compose<React.ComponentType>(withAuthRedirect)(AddPost);
