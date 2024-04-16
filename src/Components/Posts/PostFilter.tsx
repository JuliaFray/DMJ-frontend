import React, {useEffect, useState} from 'react';
import styles from '../Common/SideBlock/SideBlock.module.scss';
import Paper from '@mui/material/Paper';
import {Container, FormControl, IconButton, Input, InputAdornment, InputLabel, Tab, Tabs} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import {useForm} from 'react-hook-form';

const a11yProps = (index: number) => {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}
type IPostFilter = {
    onTabChange: (val: boolean) => void,
    onFilterChange: (val: string) => void,
}

const PostFilter: React.FC<IPostFilter> = (props, context) => {

    const {handleSubmit} = useForm({
        defaultValues: {},
        mode: 'onChange'
    });

    const [filter, setFilter] = useState('');

    useEffect(() => {
        setTabIndex(0)
    }, [])
    const [tabIndex, setTabIndex] = useState<number>(0);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabIndex(newValue);
        props.onTabChange(!!newValue)
    };

    const handleFilterChange = () => {
        props.onFilterChange(filter);
    }

    return (
        <Paper classes={{root: styles.root}}>

            <FormControl className={styles.filter} variant="filled">
                <form onSubmit={handleSubmit(handleFilterChange)}>
                </form>
                <InputLabel htmlFor="standard-adornment-password">Поиск...</InputLabel>
                <Input id='standard-adornment-password' type={'text'} value={filter}
                       onChange={e => setFilter(e.target.value)}
                       endAdornment={
                           <InputAdornment position="end">
                               <IconButton aria-label="toggle password visibility" onClick={handleFilterChange}>
                                   <SearchIcon/>
                               </IconButton>
                           </InputAdornment>
                       }
                />
            </FormControl>


            <Container maxWidth="lg">
                <Tabs value={tabIndex} onChange={handleTabChange} centered variant='fullWidth'>
                    <Tab label='Новые' {...a11yProps(0)}/>
                    <Tab label='Лучшие' {...a11yProps(1)}/>
                </Tabs>
            </Container>
        </Paper>
    );
}

export default PostFilter;
