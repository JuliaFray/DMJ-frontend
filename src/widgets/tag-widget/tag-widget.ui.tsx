import React from 'react';

import { Badge } from '@mantine/core';

import { TChipData } from 'shared/types';
import { SideBlock } from 'shared/ui';

import styles from './tag-widget.module.scss';

export type ITagBlock = {
  title: string;
  items: TChipData[];
  handleAddTag: (item: TChipData, isAuthor?: boolean) => void;
  isAuthor?: boolean;
  selected: TChipData[] | null;
};

export const TagWidget: React.FC<ITagBlock> = ({
  title,
  items,
  handleAddTag,
  isAuthor = false,
  selected,
}) => {
  return (
    <SideBlock title={title}>
      {(items || [...Array(5)]).map((item) => (
        <Badge
          key={item._id}
          variant={selected?.some((t) => t._id === item._id) ? 'filled' : 'outline'}
          onClick={() => handleAddTag(item, isAuthor)}
          style={{ cursor: 'pointer' }}
          className={styles.tag}
        >
          {`${item.value} (${item.useCount})`}
        </Badge>
      ))}
    </SideBlock>
  );
};
