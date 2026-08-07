import React, { CSSProperties } from 'react';

import { CircularProgress } from '@mui/material';

type TSpinner = {
  display?: boolean;
  position?: 'over' | 'row';
};
export const Spinner: React.FC<TSpinner> = ({ display, position }) => {
  const defaultStyle = {
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const overStyle = {
    ...defaultStyle,
    top: '0',
    left: '0',
    zIndex: '1000',
    backgroundColor: 'rgba(244,246,246,0.3)',
    backdropFilter: 'blur(2px)',
    marginTop: '0px',
  };

  const style: CSSProperties =
    position === 'over' ? { ...overStyle, position: 'absolute' } : { ...defaultStyle };

  return display ? (
    <div style={{ ...style }}>
      <CircularProgress style={{ height: '80px', width: '80px' }} />
    </div>
  ) : null;
};
