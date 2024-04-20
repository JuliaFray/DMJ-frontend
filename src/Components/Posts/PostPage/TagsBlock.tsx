import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import TagIcon from '@mui/icons-material/Tag';
import ListItemText from '@mui/material/ListItemText';
import Skeleton from '@mui/material/Skeleton';

import {SideBlock} from '../../Common/SideBlock/SideBlockComponent'
import {useQueryParams} from '../../../hook/hooks';
import {IChipData} from '../../../types/types';

export type ITagBlock = {
    items: IChipData[];
    isLoading: boolean,
    query: string | null
}
const TagsBlock: React.FC<ITagBlock> = ({items, isLoading = true, query}) => {

    const {queryParams, setQueryParams} = useQueryParams({tags: query ? query : ''});

    const handleTagChange = (item: IChipData) => {
        setQueryParams({tags: item.value});
    }

    return (
        <SideBlock title='Тэги'>
            {(items || [...Array(5)]).map((item, i) =>
                <ListItem key={i} disablePadding onClick={() => handleTagChange(item)}>
                    <ListItemButton style={{padding: '5px 0'}}>
                        <ListItemIcon style={{minWidth: '21px', marginRight: '5px'}}>
                            <TagIcon/>
                        </ListItemIcon>
                        {isLoading ? (
                            <Skeleton width={'100%'}/>
                        ) : (
                            <ListItemText primary={item.value}/>
                        )}
                    </ListItemButton>
                </ListItem>
            )}
        </SideBlock>
    );
};

export default TagsBlock;
