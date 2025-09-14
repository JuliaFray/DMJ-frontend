import React, { FC } from 'react';

import { Chip, Container } from '@mui/material';

import { TChipData } from 'shared/types';

interface Props {
  allTags: TChipData[];
  handleRemoveTag: (item: TChipData) => void;
}

export const ArticleFilter: FC<Props> = ({ allTags, handleRemoveTag }) => {
  return (
    <Container sx={{ display: 'flex', justifyContent: 'start', gap: '10px', flexWrap: 'wrap' }}>
      {Array.from(allTags).map((tag, index) => (
        <Chip
          key={index}
          color='primary'
          clickable
          size='small'
          label={tag.value}
          onDelete={() => handleRemoveTag(tag)}
        />
      ))}
    </Container>
  );
};
