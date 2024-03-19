import React from 'react';
import clsx from 'clsx';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import EyeIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';

import styles from './Post.module.scss';
import {UserInfo} from '../UserInfo/UserInfo';
import {PostSkeleton} from '../PostSkeleton';
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";

import {IPost} from '../../../types/types';
import {deletePost} from '../../../redux/posts/posts-thunks';
import ReactMarkdown from 'react-markdown';
import {BASE_URL} from '../../../api/api';

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

    const onClickRemove = () => {
        if(window.confirm('Вы действительно хотите удалить статью?')) {
            dispatch(deletePost({payload: post}));
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
                        <IconButton color="primary">
                            <EditIcon/>
                        </IconButton>
                    </Link>
                    <IconButton onClick={onClickRemove} color="secondary">
                        <DeleteIcon/>
                    </IconButton>
                </div>
            )}
            {!!post.imageUrl && (
                <img src={post.imageUrl.includes('http')
                    ? post.imageUrl : `${BASE_URL}${post.imageUrl}`} alt="Uploaded"
                    className={clsx(styles.image, {[styles.imageFull]: isFullPost})}
                />
            )}
            <div className={styles.wrapper}>
                <UserInfo avatarUrl={''} fullName={post.author?.firstName} additionalText={post.createdAt}/>
                <div className={styles.indention}>
                    <h2 className={clsx(styles.title, {[styles.titleFull]: isFullPost})}>
                        {isFullPost ? post.title : <Link to={`/posts/${post._id}`}>{post.title}</Link>}
                    </h2>
                    <ul className={styles.tags}>
                        {post.tags?.map((name) => (
                            <li key={name}>
                                <Link to={`/tag/${name}`}>#{name}</Link>
                            </li>
                        ))}
                    </ul>
                    <ReactMarkdown children={post.text}/>

                    <ul className={styles.postDetails}>
                        <li>
                            <EyeIcon/>
                            <span>{post.viewsCount}</span>
                        </li>
                        <li>
                            <CommentIcon/>
                            <span>{post.comments?.length}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};
