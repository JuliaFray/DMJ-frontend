import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../redux/redux-store';
import {useEffect, useState} from 'react';

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
    }, [value]);

    return [value, setValue];
}
