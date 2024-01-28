import React from 'react';
import {NavLink} from 'react-router-dom';
import StyleSheet from './Navbar.module.css';
import {useSelector} from 'react-redux';
import {getAuthId} from '../../redux/auth/auth-selectors';


const Nav = () => {
    const userId = useSelector(getAuthId);
    return (
        <div>
            <nav className={`${StyleSheet.nav}`}>
                <div className={`${StyleSheet.item}`}>
                    <NavLink to={`/${userId}`}>Profile</NavLink>
                </div>
                <div className={StyleSheet.item}>
                    <NavLink to='/friends'>Friends</NavLink>
                </div>
                <div className={StyleSheet.item}>
                    <NavLink to='/dialogs'>Messages</NavLink>
                </div>
                <div className={StyleSheet.item}>
                    <NavLink to='/music'>Music</NavLink>
                </div>
                <div className={StyleSheet.item}>
                    <NavLink to='/video'>Video</NavLink>
                </div>
                <div className={StyleSheet.item}>
                    <NavLink to='/news'>News</NavLink>
                </div>
                <div className={StyleSheet.item}>
                    <NavLink to='/notifications'>Notifications</NavLink>
                </div>
                <div className={StyleSheet.item}>
                    <NavLink to='/users'>All Users</NavLink>
                </div>

                <div className={StyleSheet.item}>
                    <NavLink to='/settings'>Settings</NavLink>
                </div>

            </nav>
        </div>
    );
}

export default Nav;
