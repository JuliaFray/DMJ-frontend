import React, { Dispatch, SetStateAction } from 'react';

import { Pagination } from '@mantine/core';

import style from './custom-pagination.module.scss';

type TPagination = {
  page: number;
  dataLength: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
};

export const CustomPagination: React.FC<TPagination> = ({ page, dataLength, setCurrentPage }) => {
  const count: number = Math.ceil(dataLength / 20);

  const handleOnPageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  if (count < 2) {
    return null;
  }

  return (
    <Pagination
      className={style.pagination}
      color='teal'
      withEdges
      siblings={1}
      defaultValue={page}
      onChange={handleOnPageChange}
      boundaries={1}
      total={count}
    />
  );
};
