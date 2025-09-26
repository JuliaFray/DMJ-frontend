import React, { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';

import clsx from 'clsx';
import 'easymde/dist/easymde.min.css';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import SimpleMDE from 'react-simplemde-editor';

import DeleteIcon from '@mui/icons-material/Clear';
import { Tooltip } from '@mui/material';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';

import { useAppDispatch, useAppSelector } from 'shared/hook';
import { convertBase64ToBlob, pathKeys } from 'shared/lib';
import { createPost, editPost, getOnePost, getPost, postsActions } from 'shared/model';
import { TChipData } from 'shared/types';
import { AutocompleteField, InputFileUpload } from 'shared/ui';

import styles from './create-article.module.scss';

export const CreateArticle: React.FC = () => {
  const { id } = useParams();

  const post = useAppSelector(getPost);

  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState<(string | TChipData)[]>([]);
  const [file, setFile] = useState<File | string | null>(null);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { handleSubmit } = useForm({
    defaultValues: {},
    mode: 'onChange',
  });

  useEffect(() => {
    if (id) {
      dispatch(getOnePost({ postId: id }));
      if (post) {
        setTitle(post.title);
        setText(post.text);
        setTags(post.tags);
        if (post.image) {
          setFile(post.image.data);
        }
      }
    }
  }, [id]);

  const handleChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target as HTMLInputElement;
    if (files?.length) {
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

    if (file) {
      if (file instanceof File) {
        formData.append('image', file);
      } else {
        formData.append('image', convertBase64ToBlob(file));
      }
    }

    dispatch(postsActions.clearPostState());

    if (id) {
      dispatch(editPost({ file: formData, id })).then(() => {
        navigate('/posts');
      });
    } else {
      dispatch(createPost({ file: formData })).then((res) => {
        if (typeof res.payload !== 'string') {
          navigate(`/posts/${res.payload?._id}`);
        }
      });
    }
  };

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
        uniqueId: 'addPost',
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
    <Paper style={{ padding: 30 }} className={clsx(styles.root, { [styles.rootFull]: true })}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {!file && <InputFileUpload text='Загрузить изображение' onClick={handleChangeFile} />}

        {!!file && (
          <div className={styles.editButtons}>
            <IconButton onClick={onClickRemoveImage} color='secondary'>
              <Tooltip title='Удалить изображение'>
                <DeleteIcon />
              </Tooltip>
            </IconButton>
          </div>
        )}
        {!!file && <img className={styles.image} src={image} alt='postImage' />}

        <br />
        <br />
        <TextField
          classes={{ root: styles.title }}
          variant='standard'
          placeholder='Заголовок статьи...'
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <AutocompleteField values={tags} onChange={(val) => setTags(val)} />
        <SimpleMDE className={styles.editor} value={text} onChange={onChange} options={options} />
        <div className={styles.buttons}>
          <Button type='submit' size='large' variant='contained'>
            {id ? 'Сохранить' : 'Опубликовать'}
          </Button>
          <Link to={id ? `/article/${id}` : pathKeys.root}>
            <Button size='large'>Отмена</Button>
          </Link>
        </div>
      </form>
    </Paper>
  );
};
