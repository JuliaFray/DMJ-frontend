import React, { Dispatch, SetStateAction } from 'react';

import { v4 as uuidv4 } from 'uuid';

import { Chip } from '@mui/material';

import { TChipData } from 'shared/types';
import { SideBlock } from 'shared/ui';

import styles from './tag-widget.module.scss';

export type ITagBlock = {
  title: string;
  items: TChipData[];
  setSelectedTags: Dispatch<SetStateAction<Set<TChipData>>>;
};
export const TagWidget: React.FC<ITagBlock> = ({ title, items, setSelectedTags }) => {
  const handleTagChange = (item: TChipData) => {
    setSelectedTags((prev) => new Set(prev).add(item));
  };

  return (
    <SideBlock title={title}>
      {(items || [...Array(5)]).map((item, i) => (
        <Chip
          key={uuidv4()}
          color='primary'
          size='small'
          label={`${item.value} (${item.useCount})`}
          className={styles.tag}
          onClick={() => handleTagChange(item)}
        />
      ))}
    </SideBlock>
  );
};
