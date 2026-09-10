import React, { CSSProperties, forwardRef } from 'react';

import { MantineLoaderComponent } from '@mantine/core';

type TSpinner = {
  display?: boolean;
  position?: 'over' | 'row';
};

export const Spinner = forwardRef<MantineLoaderComponent, TSpinner>(
  ({ display, position, ...others }) => {
    const defaultStyle = {
      height: '50px',
      width: '50px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    };

    const overStyle = {
      ...defaultStyle,
      // top: '0',
      // left: '0',
      zIndex: '1000',
      // backgroundColor: 'rgba(244,246,246,0.3)',
      // backdropFilter: 'blur(2px)',
      // marginTop: '0px',
    };

    const style: CSSProperties =
      position === 'over'
        ? {
            ...overStyle,
            // position: 'absolute'
          }
        : { ...defaultStyle };

    return display ? (
      <div style={{ ...style }}>
        <svg
          {...others}
          style={{
            width: 'var(--loader-size)',
            height: 'var(--loader-size)',
            stroke: 'var(--loader-color)',
            ...style,
          }}
          viewBox='0 0 45 45'
          xmlns='http://www.w3.org/2000/svg'
          stroke='#fff'
        >
          <g fill='none' fillRule='evenodd' transform='translate(1 1)' strokeWidth='2'>
            <circle cx='22' cy='22' r='6' strokeOpacity='0'>
              <animate
                attributeName='r'
                begin='1.5s'
                dur='3s'
                values='6;22'
                calcMode='linear'
                repeatCount='indefinite'
              />
              <animate
                attributeName='stroke-opacity'
                begin='1.5s'
                dur='3s'
                values='1;0'
                calcMode='linear'
                repeatCount='indefinite'
              />
              <animate
                attributeName='stroke-width'
                begin='1.5s'
                dur='3s'
                values='2;0'
                calcMode='linear'
                repeatCount='indefinite'
              />
            </circle>
            <circle cx='22' cy='22' r='6' strokeOpacity='0'>
              <animate
                attributeName='r'
                begin='3s'
                dur='3s'
                values='6;22'
                calcMode='linear'
                repeatCount='indefinite'
              />
              <animate
                attributeName='stroke-opacity'
                begin='3s'
                dur='3s'
                values='1;0'
                calcMode='linear'
                repeatCount='indefinite'
              />
              <animate
                attributeName='stroke-width'
                begin='3s'
                dur='3s'
                values='2;0'
                calcMode='linear'
                repeatCount='indefinite'
              />
            </circle>
            <circle cx='22' cy='22' r='8'>
              <animate
                attributeName='r'
                begin='0s'
                dur='1.5s'
                values='6;1;2;3;4;5;6'
                calcMode='linear'
                repeatCount='indefinite'
              />
            </circle>
          </g>
        </svg>
      </div>
    ) : null;
  },
);
