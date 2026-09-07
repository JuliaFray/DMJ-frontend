import React from 'react';

import { Link } from 'react-router-dom';

import { Container, Text } from '@mantine/core';

import styles from './side-block.module.scss';

type TSideBlock = {
  title?: string;
  icon?: React.JSX.Element;
  link?: string;
  children: React.JSX.Element[];
};
export const SideBlock: React.FC<TSideBlock> = ({ title, icon, link, children }) => {
  return (
    <Container classNames={{ root: styles.root }}>
      {link && (
        <Link className={styles.link} to={link}>
          {icon}
          <Text classNames={{ root: styles.title }}>{title}</Text>
        </Link>
      )}

      {!link && (
        <>
          {icon}
          <Text classNames={{ root: styles.title }}>{title}</Text>
        </>
      )}

      <Container className={styles.container}>{children}</Container>
    </Container>
  );
};
