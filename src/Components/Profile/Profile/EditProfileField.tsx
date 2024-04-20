import {Input, ListItemText} from '@mui/material';
import React from 'react';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {LocalizationProvider} from '@mui/x-date-pickers';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/de';
import styles from './ProfileInfo.module.scss'

type IEditProfileField = {
    editMode: boolean,
    name: string,
    value: string,
    type: 'string' | 'date',
    placeholder?: string
}

const EditProfileField: React.FC<IEditProfileField> = (props, context) => {
    return (
        <div className={styles.editFields}>
            {props.editMode && props.type === 'string' &&
                <Input defaultValue={props.value} inputProps={{'aria-label': props.name}}
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
