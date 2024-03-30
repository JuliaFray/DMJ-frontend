import React, {useState} from 'react';
import clsx from 'clsx';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';

import styles from './Post.module.scss';
import {UserInfo} from '../UserInfo/UserInfo';
import {PostSkeleton} from '../PostSkeleton';
import {Link, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";

import {IPost} from '../../../types/types';
import {deletePost, markPostFavorite, togglePostRating} from '../../../redux/posts/posts-thunks';
import ReactMarkdown from 'react-markdown';
import {Tooltip} from '@mui/material';
import {getFullName, getImage, hasImage} from '../../../Utils/helper';
import CustomCardActions from '../CustomCardActions';

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

    const [isFavorite, setIsFavorite] = useState(!!post.likes);
    const [rating, setRating] = useState(post.rating || 0);
    const [userRating, setUserRating] = useState(post.userRating || 0);

    const onClickFavorite = () => {
        setIsFavorite(!isFavorite);
        dispatch(markPostFavorite({postId: post._id}));
    }

    const onClickRating = (val: number) => {
        setRating(rating + val);
        setUserRating(userRating + val);
        dispatch(togglePostRating({postId: post._id, rating: userRating + val}));
    }

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
                    <IconButton onClick={onClickRemove} color="secondary">
                        <Tooltip title='Удалить'>
                            <DeleteIcon/>
                        </Tooltip>
                    </IconButton>
                </div>
            )}

            {hasImage(post.image) && <img className={styles.image} src={getImage(post.image)}></img>}

            <div className={styles.wrapper}>
                <UserInfo avatar={getImage(post.author.avatar, true)}
                          fullName={getFullName(post.author)}
                          additionalText={post.createdAt}/>
                <div className={styles.indention}>
                    <h2 className={clsx(styles.title, {[styles.titleFull]: isFullPost})}>
                        {isFullPost ? post.title : <Link to={`/posts/${post._id}`}>{post.title}</Link>}
                    </h2>

                    {!!post.tags?.length &&
                        <ul className={styles.tags}>
                            {post.tags?.map((name) => (
                                <li key={name}>
                                    <Link to={`/tag/${name}`}>#{name}</Link>
                                </li>
                            ))}
                        </ul>
                    }

                    <ReactMarkdown children={post.text}/>

                    <CustomCardActions post={post} userRating={userRating} rating={rating} isFavorite={isFavorite}
                                       onClickRating={onClickRating} onClickFavorite={onClickFavorite} isCard={false}/>
                </div>
            </div>
        </div>
    );
};
