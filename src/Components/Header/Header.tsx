import React from 'react';
import StyleSheet from './Header.module.css';
import {NavLink} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {getIsAuth, getLogin} from '../../redux/auth-selectors';
import {logout} from '../../redux/auth-reducer';

const Header: React.FC = () => {

    const isAuth = useSelector(getIsAuth);
    const login = useSelector(getLogin);
    const dispatch = useDispatch();

    const onLogout = () => {
        dispatch(logout)
    };

    return (
        <header className={StyleSheet.header}>

            <div className={StyleSheet.img}>
                <img alt='logo' src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Logo_TV_2015.svg/1200px-Logo_TV_2015.svg.png'/>
            </div>

            <div className={StyleSheet.loginBlock}>
                {isAuth
                    ? <div>{login}
                        <button className={StyleSheet.btn} onClick={onLogout}>Logout</button>
                    </div>
                    : <NavLink to={'/login'}>login</NavLink>}

            </div>

        </header>
    );
};

export default Header;
