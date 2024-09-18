import React from 'react';
import {Delete} from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import {Tooltip} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import clsx from 'clsx';
import {ArticleSkeleton, TArticle} from 'entities/article';
import {TChipData} from 'entities/tag';
import ReactMarkdown from 'react-markdown';
import {useDispatch} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {getFullName, getImage, hasImage} from 'shared/lib/helper';
import {deletePost} from 'shared/model/posts/posts-thunks';
import {v4 as uuidv4} from 'uuid';
import CustomCardActions from 'widgets/article-card/CustomCardActions';
import {UserInfo} from 'widgets/user-info/UserInfo';
import styles from './article.module.scss';

export type PostPropsType = {
    post: TArticle,
    isFullPost: boolean,
    isLoading: boolean,
    isEditable: boolean
}

export const Article: React.FC<PostPropsType> = ({
    post, isFullPost, isLoading, isEditable,
}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onClickRemove = () => {
        if(window.confirm('Вы действительно хотите удалить статью?')) {
            dispatch(deletePost({payload: post}));
            navigate('/');
        }
    };

    if(isLoading) {
        return <ArticleSkeleton/>;
    }

    return (
        <div className={clsx(styles.root, {[styles.rootFull]: isFullPost})}>
            {isEditable && (
                <div className={styles.editButtons}>
                    <Link to={`/${post._id}/edit`}>
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
                        {isFullPost ? post.title : <Link key={post._id} to={`/${post._id}`}>{post.title}</Link>}
                    </h2>

                    {!!post.tags?.length &&
                        <ul className={styles.tags}>
                            {post.tags.length && post.tags.map((tag: TChipData) => (
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
