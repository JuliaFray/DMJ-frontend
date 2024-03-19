import React from 'react';
import StyleSheet from './SideBar.module.css';
import FriendItem from './FriendItem/FriendItem'
import {SimpleNameObj} from "../../types/types";

type PropsType = {
    data: {
        sidebar: Array<SimpleNameObj>
    }
}

const Sidebar: React.FC<PropsType> = (props) => {
    let friendElements = props.data.sidebar.map(el => <FriendItem key={el.id} id={el.id} name={el.name} />);

    return (
        <div className={StyleSheet.friends}>
            <span>Friends online</span>
            {friendElements}
        </div>
    )
};

export default Sidebar;
