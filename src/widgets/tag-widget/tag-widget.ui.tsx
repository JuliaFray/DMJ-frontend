import React from 'react';
import TagIcon from '@mui/icons-material/Tag';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Skeleton from '@mui/material/Skeleton';
import {TChipData} from 'entities/tag';
import {SideBlock} from 'shared'
import {useQueryParams} from 'shared/hook/hooks';
import styles from './tag-widget.module.scss';

export type ITagBlock = {
    items: TChipData[];
    isLoading: boolean,
    query: string | null
}
export const TagWidget: React.FC<ITagBlock> = ({items, isLoading = true, query}) => {

    const {queryParams, setQueryParams} = useQueryParams({tags: query ? query : ''});

    const handleTagChange = (item: TChipData) => {
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
