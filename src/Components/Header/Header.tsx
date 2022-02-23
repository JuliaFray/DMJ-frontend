import React from 'react';
import StyleSheet from './Header.module.css';
import {NavLink} from 'react-router-dom';

type PropsType = {
    isAuth: boolean,
	login: string | null,
    logout: () => {}
}

const Header: React.FC<PropsType> = (props) => {
    return (
        <header className={StyleSheet.header}>

            <div className={StyleSheet.img}>
                <img alt='logo' src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Logo_TV_2015.svg/1200px-Logo_TV_2015.svg.png'/>
            </div>

            <div className={StyleSheet.loginBlock}>
                {props.isAuth
                    ? <div>{props.login}
                        <button className={StyleSheet.btn} onClick={props.logout}>Logout</button>
                    </div>
                    : <NavLink to={'/login'}>login</NavLink>}

            </div>

        </header>
    );
};

export default Header;
