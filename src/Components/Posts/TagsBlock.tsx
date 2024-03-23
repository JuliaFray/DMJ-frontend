import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import TagIcon from '@mui/icons-material/Tag';
import ListItemText from '@mui/material/ListItemText';
import Skeleton from '@mui/material/Skeleton';

import {SideBlock} from '../Common/SideBlock/SideBlockComponent'
import {useQueryParams} from '../../hook/hooks';
import {useLocation} from 'react-router-dom';

export type ITagBlock = {
    items: string[];
    isLoading: boolean,
    query: string | null
}
export const TagsBlock: React.FC<ITagBlock> = ({items, isLoading = true, query}) => {

    const {queryParams, setQueryParams} = useQueryParams({tags: query ? query : ''});

    const handleTagChange = (name: string) => {
        setQueryParams({tags: name});
    }

    return (
        <SideBlock title='Тэги'>
            {(items || [...Array(5)]).map((name, i) =>
                <ListItem key={i} disablePadding onClick={() => handleTagChange(name)}>
                    <ListItemButton>
                        <ListItemIcon>
                            <TagIcon/>
                        </ListItemIcon>
                        {isLoading ? (
                            <Skeleton width={100}/>
                        ) : (
                            <ListItemText primary={name}/>
                        )}
                    </ListItemButton>
                </ListItem>
            )}
        </SideBlock>
    );
};
