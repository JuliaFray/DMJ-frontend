import React, {useEffect, useState} from 'react';

type PropsType = {
    isOwner: boolean
    status: string

    updateUserStatus(status: string): void
}

const ProfileStatusWithHooks: React.FC<PropsType> = ({status, updateUserStatus, isOwner}) => {

    let [editSwitch, setEditSwitch] = useState<boolean>(false);
    let [valueStatus, setStatus] = useState<string>(status);

    useEffect(() => {
        const savedEditSwitch = JSON.parse(localStorage.getItem('editSwitch') || 'false') as boolean;

        if(savedEditSwitch) {
            setEditSwitch(savedEditSwitch)
        }

        setStatus(status);
    }, [status]);

    useEffect(() => {
        localStorage.setItem('editSwitch', JSON.stringify(false))
    }, []);

    const changeStatus = () => {
        isOwner && setEditSwitch(true);
        isOwner && localStorage.setItem('editSwitch', JSON.stringify(true))
    };
    const saveStatus = () => {
        setEditSwitch(false);
        localStorage.setItem('editSwitch', JSON.stringify(false))
        updateUserStatus(valueStatus);
    };
    const saveStatusOnKey = (event: React.KeyboardEvent) => {
        if(event.key === 'Enter') {
            setEditSwitch(false);
            localStorage.setItem('editSwitch', JSON.stringify(false))
            updateUserStatus(valueStatus);
        }
    };
    const onStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStatus(event.currentTarget.value);
    };

    return (
        <div className='profile__info-user-status-block-value'>
            {!editSwitch && <span onDoubleClick={changeStatus}>{status || '---'}</span>}
            {editSwitch &&
			<input onChange={onStatusChange} autoFocus={true}
			       onBlur={saveStatus} onKeyPress={saveStatusOnKey} value={valueStatus}></input>
            }
        </div>
    )

};

export default ProfileStatusWithHooks;
