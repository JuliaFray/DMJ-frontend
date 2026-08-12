import React, { FC } from 'react';

import { Chip, Container, Group } from '@mantine/core';

import { TChipData } from 'shared/types';

interface Props {
  allTags: TChipData[];
  handleRemoveTag: (item: TChipData) => void;
}

export const ArticleFilter: FC<Props> = ({ allTags, handleRemoveTag }) => {
  return (
    <Container h={50} mt='md'>
      <Chip.Group multiple value={allTags.map((t) => t._id)}>
        <Group>
          {Array.from(allTags).map((tag, index) => (
            <Chip variant='filled' key={index} value={tag._id} onClick={() => handleRemoveTag(tag)}>
              {tag.value}
            </Chip>
          ))}
        </Group>
      </Chip.Group>
    </Container>
  );
};
