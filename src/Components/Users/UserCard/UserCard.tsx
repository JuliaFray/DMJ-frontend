import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import {red} from '@mui/material/colors';
import {IUser} from '../../../types/types';
import Badge from '@mui/material/Badge';
import {Link} from 'react-router-dom';
import {DoubleArrow, Grade, Visibility} from '@mui/icons-material';
import {Tooltip} from '@mui/material';
import {useAppDispatch} from '../../../hook/hooks';
import {NO_AVATAR} from '../../../Utils/DictConstants';

export type PostCardProps = {
    user: IUser,
    follow: (userId: string) => void,
    unfollow: (userId: string) => void
}

export const UserCard: React.FC<PostCardProps> = ({user}) => {

    const dispatch = useAppDispatch();

    const image = `data:image/jpeg;base64,${user?.avatar?.data}` || NO_AVATAR;
    return (
        <Card sx={{height: 250, width: 200}}>
            <Avatar alt={user.firstName} src={image} sx={{bgcolor: red[500]}} aria-label="recipe"/>
            <CardHeader
                sx={{height: 70}}

                subheader={`${user.firstName} ${user.secondName}`}
                titleTypographyProps={{
                    variant: 'subtitle1',
                    whiteSpace: 'normal'
                }}
            />

            <CardActions disableSpacing style={{position: 'relative'}}
                         sx={{
                             alignSelf: 'stretch',
                             display: 'flex',
                             justifyContent: 'flex-start',
                             alignItems: 'flex-start',
                             p: 0,
                         }}>
                <Tooltip title='В друзья'>
                    <IconButton aria-label="add to favorites">
                        <Grade color={'error'}/>
                    </IconButton>
                </Tooltip>

                <Tooltip title='Написать'>
                    <IconButton aria-label="viewsCount">
                        <Badge
                            showZero={true}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            color="primary">
                            <Visibility/>
                        </Badge>
                    </IconButton>
                </Tooltip>

                <Link to={`/users/${user._id}`} style={{position: 'absolute', right: '0'}}>
                    <Tooltip title='Перейти'>
                        <IconButton aria-label='forward'>
                            <DoubleArrow/>
                        </IconButton>
                    </Tooltip>
                </Link>
            </CardActions>
        </Card>
    );
}
