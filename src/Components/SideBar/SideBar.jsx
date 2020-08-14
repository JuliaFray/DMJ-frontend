import React from 'react';
import StyleSheet from './SideBar.module.css';
import FriendItem from './FriendItem/friendItem'

const Sidebar = (props) => {
    let friendElements = props.data.sidebar.map(el => <FriendItem id={el.id} name={el.name} />);

    return (
        <div className={StyleSheet.friends}>
            <span>Friends online</span>
            {friendElements}
        </div>
    )
}

export default Sidebar;