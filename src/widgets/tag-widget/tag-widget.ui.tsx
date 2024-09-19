import React, {useEffect, useState} from 'react';
import TagIcon from '@mui/icons-material/Tag';
import {Chip} from "@mui/material";
import {TChipData} from 'entities/tag';
import {SideBlock} from 'shared'
import {useQueryParams} from 'shared/hook/hooks';
import {v4 as uuidv4} from "uuid";
import styles from './tag-widget.module.scss';

export type ITagBlock = {
    items: TChipData[];
    isLoading: boolean,
    query: string | null
}
export const TagWidget: React.FC<ITagBlock> = ({items, isLoading = true, query}) => {

    const [selectedTag, setSelectedTag] = useState<TChipData | null>(null);
    const {queryParams, setQueryParams} = useQueryParams({tags: query ? query : ''});

    useEffect(() => {
        setSelectedTag((prev) => {
                return prev && prev.value === queryParams.tags
                    ? null : items.find(item => item.value === queryParams.tags)!
            }
        );
    }, [queryParams])

    const handleTagChange = (item: TChipData) => {
        setQueryParams({tags: selectedTag && selectedTag === item ? '' : item.value});
        setSelectedTag(prev => prev && prev === item ? null : item);
    }

    return (
        <SideBlock title='Популярное'>
            {(items || [...Array(5)]).map((item, i) =>
                <Chip key={uuidv4()} color='primary' icon={<TagIcon className={styles.icon}/>} size="small" label={`${item.value} (${item.useCount})`} className={styles.tag}
                      variant={item === selectedTag ? 'filled' : 'outlined'} onClick={() => handleTagChange(item)}/>
            )}
        </SideBlock>
    );
};
