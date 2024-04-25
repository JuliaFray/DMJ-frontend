import {Input, ListItemText} from '@mui/material';
import React, {ChangeEvent, Dispatch, SetStateAction, useState} from 'react';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {LocalizationProvider} from '@mui/x-date-pickers';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/de';
import styles from './ProfileInfo.module.scss'
import {IProfile} from '../../../types/types';

type IEditProfileField = {
    editMode: boolean,
    name: string,
    value: string,
    type: 'string' | 'date',
    placeholder?: string,
    state: IProfile | null,
    setState: Dispatch<SetStateAction<IProfile>>
}

const EditProfileField: React.FC<IEditProfileField> = (props, context) => {

    const [value, setValue] = useState(props.value);

    const handleChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);

        if(props.state) {
            props.setState({
                ...props.state,
                [props.name]: event.target.value
            });
        }
    };

    return (
        <div className={styles.editFields}>
            {props.editMode && props.type === 'string' &&
                <Input defaultValue={value} inputProps={{'aria-label': props.name}}
                       onChange={handleChangeFile}
                       placeholder={props.placeholder} className={styles.input}/>}
            {props.editMode && props.type === 'date' &&
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
                    <DatePicker className={styles.datePicker}/>
                </LocalizationProvider>
            }

            {!props.editMode && <ListItemText key={props.name} primary={props.value}/>}
        </div>

    );
}

export default EditProfileField;
