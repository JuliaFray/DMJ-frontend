import React from 'react';

import { v4 as uuidv4 } from 'uuid';

import { Chip } from '@mui/material';

import { TChipData } from 'shared/types';
import { SideBlock } from 'shared/ui';

import styles from './tag-widget.module.scss';

export type ITagBlock = {
  title: string;
  items: TChipData[];
  handleAddTag: (item: TChipData, isAuthor?: boolean) => void;
  isAuthor?: boolean;
};
export const TagWidget: React.FC<ITagBlock> = ({
  title,
  items,
  handleAddTag,
  isAuthor = false,
}) => {
  return (
    <SideBlock title={title}>
      {(items || [...Array(5)]).map((item) => (
        <Chip
          key={uuidv4()}
          color='primary'
          size='small'
          label={`${item.value} (${item.useCount})`}
          className={styles.tag}
          onClick={() => handleAddTag(item, isAuthor)}
        />
      ))}
    </SideBlock>
  );
};
