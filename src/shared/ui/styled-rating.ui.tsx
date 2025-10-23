import { Rating, styled } from '@mui/material';

import { theme } from '../themes';

export const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: theme.palette.secondary.main,
  },
});
