import React from 'react';

import {SideBlock} from '../../Common/SideBlock/SideBlockComponent';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import Skeleton from '@mui/material/Skeleton';
import {IComment} from '../../../types/types';
import {NO_AVATAR} from '../../../Utils/DictConstants';

export type IComments = {
    items: IComment[],
    children: any,
    isLoading: boolean
}

export const CommentsBlock: React.FC<IComments> = ({items, children, isLoading = true}) => {

    return (
        <SideBlock title='Комментарии'>
            <List>
                {(isLoading ? [...Array(5)] : items)?.map((obj: any, i: number) => (
                    <React.Fragment key={i}>
                        <ListItem alignItems='flex-start'>
                            <ListItemAvatar>
                                {isLoading ? (
                                    <Skeleton variant='circular' width={40} height={40}/>
                                ) : (
                                    <Avatar alt={obj.author.firstName}
                                            src={obj.author.avatar.length && `data:image/jpeg;base64,${obj.author.avatar[0].data}` || NO_AVATAR}
                                    />
                                )}
                            </ListItemAvatar>
                            {isLoading ? (
                                <div style={{display: 'flex', flexDirection: 'column'}}>
                                    <Skeleton variant='text' height={25} width={120}/>
                                    <Skeleton variant='text' height={18} width={230}/>
                                </div>
                            ) : (
                                <ListItemText
                                    primary={`${obj.author.firstName} ${obj.author.secondName} ${obj.author.lastName ? obj.author.lastName : ''}`}
                                    secondary={obj.text}
                                />
                            )}
                        </ListItem>
                        <Divider variant='inset' component='li'/>
                    </React.Fragment>
                ))}
            </List>
            {children}
        </SideBlock>
    );
};
