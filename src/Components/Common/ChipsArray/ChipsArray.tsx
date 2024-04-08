import React, {useEffect, useState} from 'react';
import {styled} from '@mui/material/styles';
import {Chip, Paper} from '@mui/material';
import {IChipData} from '../../../types/types';
import styles from '../../Posts/AddPost/AddPost.module.scss';
import TextField from '@mui/material/TextField';
import {v4 as uuidv4} from 'uuid';

const ListItem = styled('li')(({theme}) => ({
    margin: theme.spacing(0.5),
}));

type IChipsArray = {
    inputPlaceHolder: string;
    value: IChipData[],
    onChange: (val: IChipData[]) => void
}

const ChipsArray: React.FC<IChipsArray> = (props, context) => {

    const [chipData, setChipData] = useState<IChipData[]>(props.value);
    const [currentTag, setCurrentTag] = useState<string>('');

    const handleDelete = (chipToDelete: IChipData) => () => {
        setChipData((chips) => chips.filter((chip) => chip._id !== chipToDelete._id));
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if(event.key == 'Enter') {
            event.stopPropagation();
            event.preventDefault();
            const data = [...chipData, {_id: uuidv4().replaceAll('-', '').slice(0, 24), value: currentTag}];
            setChipData(data);
            setCurrentTag('');
        }
    }

    useEffect(() => {
        setChipData(props.value)
    }, [props])

    useEffect(() => {
        props.onChange(chipData);
    }, [chipData])


    return (<>
            <Paper className={styles.chipArray}
                   sx={{
                       display: 'flex',
                       justifyContent: 'start',
                       flexWrap: 'wrap',
                       listStyle: 'none',
                       p: 0.5,
                       m: 0,
                   }}
                   component="ul">

                {chipData.map((data) =>
                    <ListItem key={data._id}>
                        <Chip label={data.value} onDelete={handleDelete(data)}/>
                    </ListItem>
                )}
            </Paper>

            <TextField classes={{root: styles.tags}}
                       variant='standard' placeholder={props.inputPlaceHolder} fullWidth
                       value={currentTag}
                       onChange={e => setCurrentTag(e.target.value)}
                       onKeyDown={handleKeyPress}/>
        </>
    );
}

export default ChipsArray;
