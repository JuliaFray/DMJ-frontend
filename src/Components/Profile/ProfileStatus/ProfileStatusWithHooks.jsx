import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

const ProfileStatusWithHooks = (props) => {

    const [editMode, setEditMode] = useState(false);
    const [status, setStatus] = useState(props.status || 'my status');

    useEffect(() => {
        setStatus(props.status)
    }, [props.status]);

    const activateEditMode = () => {
        setEditMode(true);
    };

    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateUserStatus(status)
    };

    const onStatusChange = ({target : {value}}) => {
        setStatus(value)
    };



    return (
        <div>
            {!editMode ?
                (
                    <div>
                        <span onClick={activateEditMode} >{ status }</span>
                    </div>
                )
                :
                (
                    <div>
                        <input onBlur={deactivateEditMode} onChange={onStatusChange} autoFocus={true} value={status} />
                    </div>
                )

            }
        
        </div>
    )
}

export default ProfileStatusWithHooks;