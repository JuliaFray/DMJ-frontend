import React from 'react';

import ConstructionIcon from '@mui/icons-material/Construction';
import { Alert } from '@mui/material';

export const MeasurePage = () => {
  return (
    <Alert icon={<ConstructionIcon />} severity='info'>
      Раздел находится в разработке
    </Alert>
  );
};
