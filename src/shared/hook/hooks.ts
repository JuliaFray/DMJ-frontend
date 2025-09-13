import React, { useContext, useEffect, useState } from 'react';

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { AppDispatch, RootState } from '../model';
import { WebSocketContext } from '../ui/WebSocketContext';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useLocalStorage = (key: string, initValue: string) => {
  const [value, setValue] = useState(() => {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : initValue;
  });

  useEffect(() => {
    const item = JSON.stringify(value);
    window.localStorage.setItem(key, item);
  }, [value, key]);

  return [value, setValue];
};

export const useQueryStringToObject = (
  queryString = '',
  options: Record<string, string[] | string | number> = {},
) => {
  const queryObject: Record<string, string[] | string | number> = {};

  if (queryString) {
    decodeURIComponent(queryString.replace('?', ''))
      .split('&')
      .forEach((itemString) => {
        const [itemKey, itemValue] = itemString.split('=');
        if (Object.hasOwn(options, itemKey)) {
          if (!queryObject[itemKey] && Array.isArray(options[itemKey])) {
            queryObject[itemKey] = [];
          }
          const q = queryObject[itemKey];

          if (Array.isArray(q)) {
            q.push(itemValue);
          } else {
            queryObject[itemKey] =
              typeof options[itemKey] === 'number' ? parseInt(itemValue, 10) : itemValue;
          }
        }
      });
  }

  return queryObject;
};

export const useCreateQueryString = (
  queryObject: Record<string, string[] | string | number> = {},
) => {
  const queryString = Object.keys(queryObject)
    .filter(
      (key) =>
        queryObject[key] &&
        !(Array.isArray(queryObject[key]) && !(queryObject[key] as string[]).length),
    )
    .map((key) => {
      const q = queryObject[key];
      return Array.isArray(q)
        ? q.map((item) => `${encodeURIComponent(key)}=${encodeURIComponent(item)}`).join('&')
        : `${encodeURIComponent(key)}=${encodeURIComponent(q)}`;
    })
    .join('&');
  return queryString ? `?${queryString}` : '';
};

export const useQueryParams = (options: Record<string, string[] | string | number>) => {
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

export const useWebSocket = () => useContext(WebSocketContext);

export default useWebSocket;
