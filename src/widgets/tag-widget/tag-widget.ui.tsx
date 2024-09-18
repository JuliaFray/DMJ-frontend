import React from 'react';
import TagIcon from '@mui/icons-material/Tag';
import {Chip} from "@mui/material";
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
        <SideBlock title='Популярное'>
            {(items || [...Array(5)]).map((item, i) =>
                <Chip color='primary' icon={<TagIcon className={styles.icon}/>} size="small" label={`${item.value} (${item.useCount})`} className={styles.tag}
                      variant="outlined" onClick={() => handleTagChange(item)}/>
            )}
        </SideBlock>
    );
};
