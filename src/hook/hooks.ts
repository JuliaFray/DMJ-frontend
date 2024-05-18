import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../redux/redux-store';
import React, {useContext, useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {WebSocketContext} from '../Components/Common/WebSocketContext';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = () => useSelector;


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
}

export const useQueryParams = (options: Record<string, string[] | string | number>) => {
    const {search} = useLocation();
    const navigate = useNavigate();

    // get query params
    const queryParams = React.useMemo(() => queryStringToObject(search, options), [search]);

    // updates the query params
    const setQueryParams = (queryObj: Record<string, string[] | string | number>) => {
        navigate({
            search: createQueryString(queryObj)
        })
    }

    return {queryParams, setQueryParams};
};

export const queryStringToObject = (queryString = "", options: Record<string, string[] | string | number> = {}) => {
    let queryObject: Record<string, string[] | string | number> = {};
    queryString && decodeURIComponent(queryString.replace('?', '')).split('&').map((itemString) => {
        let [itemKey, itemValue] = itemString.split("=");
        if(options.hasOwnProperty(itemKey)) {
            if(!queryObject[itemKey] && Array.isArray(options[itemKey])) {
                queryObject[itemKey] = [];
            }
            const q = queryObject[itemKey];
            Array.isArray(q)
                ? q.push(itemValue)
                : queryObject[itemKey] = typeof options[itemKey] === "number"
                    ? parseInt(itemValue)
                    : itemValue;
        }
    });
    return queryObject;
}

export const createQueryString = (queryObject: Record<string, string[] | string | number> = {}) => {
    let queryString = Object.keys(queryObject)
        .filter((key) => queryObject[key] && !(Array.isArray(queryObject[key]) && !(queryObject[key] as string[]).length))
        .map((key) => {
            const q = queryObject[key];
            return Array.isArray(q)
                ? q.map(item => `${encodeURIComponent(key)}=${encodeURIComponent(item)}`).join('&')
                : `${encodeURIComponent(key)}=${encodeURIComponent(q)}`;
        }).join('&');
    return queryString ? `?${queryString}` : "";
}

export const useWebSocket = () => useContext(WebSocketContext);

export default useWebSocket;
