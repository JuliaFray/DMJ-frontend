import {Input, ListItemText} from '@mui/material';
import React from 'react';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {LocalizationProvider} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/de';

type IEditProfileField = {
    editMode: boolean,
    name: string,
    value: string,
    type: 'string' | 'date'
}

const EditProfileField: React.FC<IEditProfileField> = (props, context) => {
    return (
        <>
            {props.editMode && props.type === 'string' && <Input defaultValue={props.value} inputProps={{'aria-label': props.name}}/>}
            {props.editMode && props.type === 'date' && <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de"> <DatePicker/></LocalizationProvider>}

            {!props.editMode && <ListItemText key={props.name} primary={props.value}/>}
        </>

    );
}

export default EditProfileField;
