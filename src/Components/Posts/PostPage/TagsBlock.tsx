import React from 'react';
import TagIcon from '@mui/icons-material/Tag';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Skeleton from '@mui/material/Skeleton';
import {useQueryParams} from '../../../hook/hooks';
import {IChipData} from '../../../types/types';
import {SideBlock} from '../../Common/SideBlock/SideBlockComponent'
import styles from './PostPage.module.scss';

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
        <SideBlock title='Популярные теги'>
            {(items || [...Array(5)]).map((item, i) =>
                <ListItem key={i} disablePadding onClick={() => handleTagChange(item)}>
                    <ListItemButton className={styles.tag}>
                        <ListItemIcon className={styles.icon}>
                            <TagIcon/>
                        </ListItemIcon>
                        {isLoading ? (
                            <Skeleton width={'100%'}/>
                        ) : (
                            <ListItemText primary={`${item.value} (${item.useCount})`}/>
                        )}
                    </ListItemButton>
                </ListItem>
            )}
        </SideBlock>
    );
};

export default TagsBlock;
