import {Input, ListItemText} from '@mui/material';
import React, {ChangeEvent, Dispatch, SetStateAction, useState} from 'react';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {LocalizationProvider} from '@mui/x-date-pickers';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';

import styles from './ProfileInfo.module.scss'
import {IProfile} from '../../../types/types';
import TextField from '@mui/material/TextField';
import dayjs, { Dayjs } from 'dayjs';

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
    const [dateValue, setDateValue] = useState<Dayjs | null>(dayjs(props.value));

    const handleChangeTextValue = async (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);

        if(props.state) {
            props.setState({
                ...props.state,
                [props.name]: event.target.value
            });
        }
    };

    const handleChangeDateValue = async (event: Dayjs | null) => {
        setDateValue(event);
        if(props.state) {
            props.setState({
                ...props.state,
                [props.name]: event ? event.format('DD.MM.YYYY') : null
            });
        }
    };

    return (
        <div className={styles.editFields}>
            {props.editMode && props.type === 'string' &&
                <TextField
                    className={styles.input}
                    fullWidth
                    value={value}
                    onChange={handleChangeTextValue}
                    placeholder={props.placeholder}
                />
               }

            {props.editMode && props.type === 'date' &&
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker className={styles.datePicker}
                                onChange={handleChangeDateValue}
                                value={dateValue}/>
                </LocalizationProvider>
            }

            {!props.editMode && <ListItemText key={props.name} primary={props.value}/>}
        </div>

    );
}

export default EditProfileField;
