import * as React from 'react';
import {useEffect, useState} from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import {IChipData} from '../../../types/types';
import {CircularProgress} from '@mui/material';
import {useAppDispatch} from '../../../hook/hooks';
import {getAllTags} from '../../../redux/posts/posts-thunks';
import {useSelector} from 'react-redux';
import {v4 as uuidv4} from 'uuid';
import {getAllFetchedTags} from '../../../redux/posts/posts-selectors';

type IAutocompleteField = {
    values: (string | IChipData)[],
    onChange: (val: (string | IChipData)[]) => void
}
const AutocompleteField: React.FC<IAutocompleteField> = (props, context) => {

    const [currentTag, setCurrentTag] = useState<string>('');
    const [value, setValue] = useState<(string | IChipData)[]>(props.values);
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState<(string | IChipData)[]>(props.values);
    const loading = open && options.length === 0;
    const dispatch = useAppDispatch();
    const tags = useSelector(getAllFetchedTags);

    useEffect(() => {
        dispatch(getAllTags({}));
    }, [])

    useEffect(() => {
        if(!loading) {
            return undefined;
        }
        setOptions([...tags]);
    }, [loading]);

    useEffect(() => {
        if(!open) {
            setOptions([]);
        }
    }, [open]);

    useEffect(() => {
        setValue(props.values)
    }, [options]);

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if(event.key == 'Enter') {
            const value = {_id: uuidv4().replaceAll('-', '').slice(0, 24), value: currentTag};
            setOptions([...options, value]);
            setCurrentTag('');

            event.stopPropagation();
            event.preventDefault();
        }
    }

    return (
        <Stack spacing={3} sx={{width: 500}}>
            <Autocomplete
                id='autocomplete-standard'
                multiple freeSolo
                options={options} loading={loading} open={open} value={value}
                onChange={(event: any, newValue: (string | IChipData)[]) => {
                    setValue(newValue)
                    props.onChange([...newValue]);
                }}
                onOpen={() => {setOpen(true);}}
                onClose={() => {setOpen(false);}}
                isOptionEqualToValue={(option, value) => typeof option === 'string' || typeof value === 'string' ? option === value : option._id === value._id}
                getOptionLabel={(option: string | IChipData) => typeof option === 'string' ? option : option.value}

                renderInput={(params) => (
                    <TextField
                        {...params}
                        variant='standard' label='Тэги'
                        onKeyDown={handleKeyPress}
                        value={currentTag} onChange={e => setCurrentTag(e.target.value)}
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <React.Fragment>
                                    {loading ? <CircularProgress color='inherit' size={20}/> : null}
                                    {params.InputProps.endAdornment}
                                </React.Fragment>
                            ),
                        }}
                    />
                )}
            />
        </Stack>
    );
}

export default AutocompleteField;
