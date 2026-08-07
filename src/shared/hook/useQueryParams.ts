import React from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import { useCreateQueryString, useQueryStringToObject } from './hooks';

export const useQueryParams = (options?: Record<string, string[] | string | number>) => {
  const { search } = useLocation();
  const navigate = useNavigate();

  // get query params
  const queryParams = React.useMemo(() => useQueryStringToObject(search, options), [search]);

  // updates the query params
  const setQueryParams = (queryObj: Record<string, string[] | string | number>) => {
    navigate({
      search: useCreateQueryString(queryObj),
    });
  };

  return { queryParams, setQueryParams };
};
