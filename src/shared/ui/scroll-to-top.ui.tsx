import React from 'react';

import { ArrowFatLinesUpIcon } from '@phosphor-icons/react';

import { ActionIcon, Affix, Transition } from '@mantine/core';
import { useWindowScroll } from '@mantine/hooks';

export function ScrollToTop() {
  const [scroll, scrollTo] = useWindowScroll();

  return (
    <Affix position={{ bottom: 20, right: '15%' }}>
      <Transition transition='slide-up' mounted={scroll.y > 500}>
        {(transitionStyles) => (
          <ActionIcon
            style={{ ...transitionStyles, borderRadius: '50%', height: '56px', width: '56px' }}
            onClick={() => scrollTo({ y: 0 })}
          >
            <ArrowFatLinesUpIcon size={32} />
          </ActionIcon>
        )}
      </Transition>
    </Affix>
  );
}
