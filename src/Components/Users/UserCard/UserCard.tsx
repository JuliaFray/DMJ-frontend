import * as React from 'react';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import {red} from '@mui/material/colors';
import {IUser} from '../../../types/types';
import Badge from '@mui/material/Badge';
import {Link} from 'react-router-dom';
import {DoubleArrow, Grade, Visibility} from '@mui/icons-material';
import {Box, Tooltip, Typography} from '@mui/material';
import {NO_AVATAR} from '../../../Utils/DictConstants';
import CardContent from '@mui/material/CardContent';
import {getFullName} from '../../../Utils/helper';

export type PostCardProps = {
    user: IUser,
    follow: (userId: string) => void,
    unfollow: (userId: string) => void
}

export const UserCard: React.FC<PostCardProps> = ({user}) => {

    const image = user?.avatar && `data:image/jpeg;base64,${user?.avatar?.data}` || NO_AVATAR;
    return (
        <Card sx={{height: 150, width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <Avatar alt={user.firstName} src={image} aria-label="avatar"
                    sx={{bgcolor: red[500], width: 130, height: 130, ml: 1}}/>

            <CardContent sx={{flex: '1 0 auto', mt: 1}}>
                <Typography component="div" variant="h5">
                    {getFullName(user)}
                </Typography>
            </CardContent>

            <Box sx={{display: 'flex', alignItems: 'center', pl: 1, pb: 1}}>
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

                <Link to={`/users/${user._id}`}>
                    <Tooltip title='Перейти'>
                        <IconButton aria-label='forward'>
                            <DoubleArrow/>
                        </IconButton>
                    </Tooltip>
                </Link>
            </Box>
        </Card>
    );
}
