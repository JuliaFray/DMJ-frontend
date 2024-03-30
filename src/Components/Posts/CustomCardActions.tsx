import React from "react";
import styles from './Post/Post.module.scss';
import IconButton from '@mui/material/IconButton';
import {ArrowDropDown, ArrowDropUp, DoubleArrow, Grade} from '@mui/icons-material';
import EyeIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import {Tooltip} from '@mui/material';
import {IPost} from '../../types/types';
import {Link} from 'react-router-dom';

export type ICardActions = {
    post: IPost,
    userRating: number,
    isFavorite: boolean,
    rating: number,
    onClickRating: (val: number) => void,
    onClickFavorite: () => void,
    isCard: boolean
}

const CustomCardActions: React.FC<ICardActions> = (props, context) => {
    return (
        <ul className={styles.postDetails}>
            <li key={'rating'}>
                <IconButton disabled={props.userRating === -1} aria-label="up rating" onClick={() => props.onClickRating(-1)}>
                    <ArrowDropDown/>
                </IconButton>

                <span>{props.rating}</span>

                <IconButton disabled={props.userRating === 1} aria-label="down rating" onClick={() => props.onClickRating(1)}>
                    <ArrowDropUp/>
                </IconButton>
            </li>
            <li key={'viewsCount'}>
                <EyeIcon/>
                <span>{props.post.viewsCount}</span>
            </li>
            <li key={'comments'}>
                <CommentIcon className={styles.comment}/>
                <span>{props.post.comments?.length}</span>
            </li>

            <li key={'isFavorite'}>
                <Tooltip title='В избранное'>
                    <IconButton aria-label="add to favorites" onClick={props.onClickFavorite}>
                        <Grade color={props.isFavorite ? 'error' : 'primary'}/>
                    </IconButton>
                </Tooltip>
            </li>

            {props.isCard && <li key={'link'}>
                <Link to={`/posts/${props.post._id}`} style={{position: 'absolute', right: '0'}}>
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
