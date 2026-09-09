import React, { FC } from 'react';

import { Rating } from '@mantine/core';

interface Props {
  value: number;
}

export const StyledRating: FC<Props> = ({ value }) => {
  return <Rating value={value} fractions={3} readOnly color='teal' size='lg' />;
};
