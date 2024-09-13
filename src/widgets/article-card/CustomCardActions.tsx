import React, {useState} from "react";
import {ArrowDropDown, ArrowDropUp, DoubleArrow, Grade} from '@mui/icons-material';
import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import EyeIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import {Tooltip} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import {TArticle} from 'entities/article';
import styles from 'entities/article/article.module.scss';
import {useSelector} from "react-redux";
import {Link} from 'react-router-dom';
import {useAppDispatch} from 'shared/hook/hooks';
import {getIsAuth} from "shared/model/auth/auth-selectors";
import {markPostFavorite, togglePostRating} from 'shared/model/posts/posts-thunks';

export type ICardActions = {
    post: TArticle,
    isCard: boolean,
}

const CustomCardActions: React.FC<ICardActions> = (props, context) => {

    const isAuth = useSelector(getIsAuth);

    const [isFavorite, setIsFavorite] = useState(!!props.post.likes);
    const [rating, setRating] = useState(props.post.rating || 0);
    const [userRating, setUserRating] = useState(props.post.userRating || 0);

    const dispatch = useAppDispatch();

    const onClickFavorite = () => {
        setIsFavorite(!isFavorite);
        dispatch(markPostFavorite({postId: props.post._id}));
    }

    const onClickRating = (val: number) => {
        setRating(rating + val);
        setUserRating(userRating + val);
        dispatch(togglePostRating({postId: props.post._id, rating: userRating + val}));
    }

    return (
        <ul className={styles.postDetails}>
            {isAuth && <li key={'rating'} className={styles.comment}>
                <IconButton disabled={userRating === -1} aria-label="up rating" onClick={() => onClickRating(-1)}>
                    <ArrowDropDown/>
                </IconButton>

                <span>{rating}</span>

                <IconButton disabled={userRating === 1} aria-label="down rating" onClick={() => onClickRating(1)}>
                    <ArrowDropUp/>
                </IconButton>
            </li>}
            <li key={'viewsCount'}>
                <EyeIcon className={styles.comment}/>
                <span>{props.post.viewsCount}</span>
            </li>
            <li key={'comments'}>
                <CommentIcon className={styles.comment}/>
                <span>{props.post.comments?.length}</span>
            </li>

            {!props.isCard && isAuth && <li key={'isFavorite'}>
                <Tooltip title='В избранное'>
                    <IconButton aria-label="add to favorites" onClick={onClickFavorite}>
                        <Grade color={isFavorite ? 'error' : 'disabled'}/>
                    </IconButton>
                </Tooltip>
            </li>}

            {props.isCard && <li key={'link'}>
                <Link to={`/article/${props.post._id}`} style={{position: 'absolute', right: '0'}}>
                    <Tooltip title='Читать далее'>
                        <IconButton aria-label='forward'>
                            <DoubleArrow/>
                        </IconButton>
                    </Tooltip>
                </Link>
            </li>}
        </ul>
    );
}

export default CustomCardActions;
