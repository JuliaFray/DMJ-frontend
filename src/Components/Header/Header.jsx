import React from 'react';
import StyleSheet from './Header.module.css';
import { NavLink } from 'react-router-dom';

function Header(props) {
  // debugger

  return (
    <header className={StyleSheet.header}>

      <div className={StyleSheet.img}>
        <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Logo_TV_2015.svg/1200px-Logo_TV_2015.svg.png' />
      </div>

      {/* <div className={StyleSheet.notifications} >
        <div className={StyleSheet.notification} ></div>
        <div className={StyleSheet.notification} ></div>
        <div className={StyleSheet.notification} ></div>
      </div> */}

      <div className={StyleSheet.loginBlock}>
        {props.isAuth
        ? <div>{props.login} <button className = {StyleSheet.btn} onClick = {props.logout}>Logout</button></div> 
        : <NavLink to={'/login'}>login</NavLink>}

      </div>

    </header>
  );
}

export default Header;