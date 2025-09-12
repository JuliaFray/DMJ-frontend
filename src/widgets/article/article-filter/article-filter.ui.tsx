import React, { Dispatch, FC, SetStateAction } from 'react';

import { Chip, Container } from '@mui/material';

import { TChipData } from 'shared/types';

interface Props {
  tags: TChipData[];
  setSelectedTags: Dispatch<SetStateAction<Set<TChipData>>>;
  setSelectedAuthors: Dispatch<SetStateAction<Set<TChipData>>>;
}

export const ArticleFilter: FC<Props> = ({ tags, setSelectedTags, setSelectedAuthors }) => {
  const handleRemove = (item: TChipData) => {
    setSelectedTags((prev) => {
      const newPrev = new Set(prev);
      if (newPrev.delete(item)) {
        return new Set(newPrev);
      }
      return new Set(prev);
    });

    setSelectedAuthors((prev) => {
      const newPrev = new Set(prev);
      if (newPrev.delete(item)) {
        return new Set(newPrev);
      }
      return new Set(prev);
    });
  };
  return (
    <Container>
      {Array.from(tags).map((tag, index) => (
        <Chip
          key={index}
          color='primary'
          clickable
          size='small'
          label={tag.value}
          onDelete={() => handleRemove(tag)}
        />
      ))}
    </Container>
  );
};
