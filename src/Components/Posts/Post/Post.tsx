import React from 'react';
import clsx from 'clsx';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';

import styles from './Post.module.scss';
import {UserInfo} from '../UserInfo/UserInfo';
import {PostSkeleton} from '../PostCard/PostSkeleton';
import {Link, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";

import {IChipData, IPost} from '../../../types/types';
import {deletePost} from '../../../redux/posts/posts-thunks';
import ReactMarkdown from 'react-markdown';
import {Tooltip} from '@mui/material';
import {getFullName, getImage, hasImage} from '../../../Utils/helper';
import CustomCardActions from '../PostCard/CustomCardActions';
import {Delete} from '@mui/icons-material';
import {v4 as uuidv4} from 'uuid';

export type PostPropsType = {
    post: IPost,
    isFullPost: boolean,
    isLoading: boolean,
    isEditable: boolean
}

export const Post: React.FC<PostPropsType> = ({
    post, isFullPost, isLoading, isEditable,
}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onClickRemove = () => {
        if(window.confirm('Вы действительно хотите удалить статью?')) {
            dispatch(deletePost({payload: post}));
            navigate('/posts');
        }
    };

    if(isLoading) {
        return <PostSkeleton/>;
    }

    return (
        <div className={clsx(styles.root, {[styles.rootFull]: isFullPost})}>
            {isEditable && (
                <div className={styles.editButtons}>
                    <Link to={`/posts/${post._id}/edit`}>
                        <Tooltip title='Редактировать'>
                            <IconButton color="primary">
                                <EditIcon/>
                            </IconButton>
                        </Tooltip>

                    </Link>
                    <IconButton onClick={onClickRemove} color="error">
                        <Tooltip title='Удалить'>
                            <Delete/>
                        </Tooltip>
                    </IconButton>
                </div>
            )}

            {hasImage(post.image) && <img alt={'postImage'}
                                          className={styles.image}
                                          src={getImage(post.image)}/>}

            <div className={styles.wrapper}>
                <UserInfo avatar={getImage(post.author.avatar, true)}
                          fullName={getFullName(post.author)}
                          additionalText={post.createdAt}
                          userId={post.author._id}/>
                <div className={styles.indention}>
                    <h2 className={clsx(styles.title, {[styles.titleFull]: isFullPost})}>
                        {isFullPost ? post.title : <Link key={post._id} to={`/posts/${post._id}`}>{post.title}</Link>}
                    </h2>

                    {!!post.tags?.length &&
                        <ul className={styles.tags}>
                            {post.tags.length && post.tags.map((tag: IChipData) => (
                                <li key={uuidv4()}>
                                    #{tag.value}
                                </li>
                            ))}
                        </ul>
                    }

                    <ReactMarkdown children={post.text}/>

                    <CustomCardActions post={post} isCard={false}/>
                </div>
            </div>
        </div>
    );
};
