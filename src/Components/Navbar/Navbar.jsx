import React from 'react';
import { NavLink } from 'react-router-dom';
import StyleSheet from './Navbar.module.css';
import Sidebar from '../SideBar/SideBar';


function Nav(props) {
  return (
    <div>
      <nav className={`${StyleSheet.nav}`}>
        <div className={`${StyleSheet.item} ${StyleSheet.active}`}>
          <NavLink to='/profile'>Profile</NavLink>
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

      {/* <Sidebar data={props.data} dispatch = {props.dispatch} /> */}

    </div>

  );
};

export default Nav;