import React, { useCallback, useEffect, useMemo, useState } from 'react';

import clsx from 'clsx';
import 'easymde/dist/easymde.min.css';
import { Form, Formik } from 'formik';
import { Link, useNavigate, useParams } from 'react-router-dom';
import SimpleMDE from 'react-simplemde-editor';

import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';

import { useAppDispatch, useAppSelector } from 'shared/hook';
import { pathKeys } from 'shared/lib';
import { createPost, editPost, getOnePost, postsActions, postsSelector } from 'shared/model';
import { TChipData } from 'shared/types';
import { AutocompleteField, InputWrapper } from 'shared/ui';

import styles from './create-article.module.scss';

export const CreateArticle: React.FC = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const post = useAppSelector(postsSelector.getPost);

  const [text, setText] = useState('');
  const [tags, setTags] = useState<(string | TChipData)[]>([]);

  const initialData = useMemo(
    () => ({
      title: post?.title || '',
    }),
    [],
  );

  useEffect(() => {
    if (id) {
      dispatch(getOnePost({ postId: id }));
      if (post) {
        setText(post.text);
        setTags(post.tags);
      }
    }
  }, [dispatch, id]);

  const onChange = useCallback((value: React.SetStateAction<string>) => {
    setText(value);
  }, []);

  const onSubmit = async (values: typeof initialData) => {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('text', text);
    formData.append('tags', JSON.stringify(tags));

    dispatch(postsActions.clearPostState());

    if (id) {
      dispatch(editPost({ file: formData, id })).then(() => {
        navigate(pathKeys.home());
      });
    } else {
      dispatch(createPost({ file: formData })).then((res) => {
        if (typeof res.payload !== 'string') {
          navigate(pathKeys.article.byId({ id: res.payload?._id }));
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

  return (
    <Paper style={{ padding: 10 }} className={clsx(styles.root, { [styles.rootFull]: true })}>
      <Formik
        initialValues={{ ...initialData }}
        onSubmit={(values) => onSubmit(values)}
        enableReinitialize
      >
        <Form>
          <InputWrapper name='title' label='Заголовок' classes={{ root: styles.title }} />

          <AutocompleteField values={tags} onChange={(val) => setTags(val)} />

          <SimpleMDE className={styles.editor} value={text} onChange={onChange} options={options} />

          <div className={styles.buttons}>
            <Link to={pathKeys.home()}>
              <Button size='large'>Отмена</Button>
            </Link>

            <Button type='submit' size='large' variant='contained'>
              {id ? 'Сохранить' : 'Опубликовать'}
            </Button>
          </div>
        </Form>
      </Formik>
    </Paper>
  );
};
