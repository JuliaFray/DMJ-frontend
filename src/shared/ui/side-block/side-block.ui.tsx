import React from 'react';

import { Link } from 'react-router-dom';

import { Container } from '@mui/material';
import Typography from '@mui/material/Typography';

import styles from './side-block.module.scss';

type TSideBlock = {
  title?: string;
  icon?: React.JSX.Element;
  link?: string;
  children: React.JSX.Element[];
};
export const SideBlock: React.FC<TSideBlock> = ({ title, icon, link, children }) => {
  return (
    <Container classes={{ root: styles.root }}>
      {link && (
        <Link className={styles.link} to={link}>
          {icon}
          <Typography variant='h6' classes={{ root: styles.title }}>
            {title}
          </Typography>
        </Link>
      )}

      {!link && (
        <>
          {icon}
          <Typography variant='h6' classes={{ root: styles.title }}>
            {title}
          </Typography>
        </>
      )}

      <Container className={styles.container}>{children}</Container>
    </Container>
  );
};
