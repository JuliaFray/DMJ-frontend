import React from 'react';

import ConstructionIcon from '@mui/icons-material/Construction';
import { Alert } from '@mui/material';

export const DietDiaryPage = () => {
  return (
    <Alert icon={<ConstructionIcon />} severity='warning'>
      Раздел находится в разработке
    </Alert>
  );
};
