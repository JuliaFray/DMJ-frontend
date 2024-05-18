import React, {useEffect, useState} from 'react';
import styles from '../../Common/SideBlock/SideBlock.module.scss';
import Paper from '@mui/material/Paper';
import {Container, IconButton, Tab, Tabs} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import {useForm} from 'react-hook-form';
import TextField from '@mui/material/TextField';

const a11yProps = (index: number) => {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}
type IPostFilter = {
    setTabIndex: (val: number) => void,
    setSearchValue: (val: string) => void,
}

const PostFilter: React.FC<IPostFilter> = (props, context) => {

    const {register, handleSubmit} = useForm({
        defaultValues: {search: ''},
        mode: 'onChange'
    });

    useEffect(() => {
        setTabIndex(0)
    }, [])
    const [tabIndex, setTabIndex] = useState<number>(0);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabIndex(newValue);
        props.setTabIndex(newValue)
    };

    const handleFilterSubmit = (formData: any) => {
        props.setSearchValue(formData.search);
    }

    return (
        <Paper classes={{root: styles.root}}>
            <form className={styles.filter} onSubmit={handleSubmit((values: any) => handleFilterSubmit(values))}>
                <TextField
                    variant={'outlined'}
                    label='Поиск...'
                    {...register('search')}
                />
                <IconButton aria-label='start search' type={'submit'}>
                    <SearchIcon/>
                </IconButton>
            </form>

            <Container maxWidth='lg'>
                <Tabs value={tabIndex} onChange={handleTabChange} centered variant='fullWidth'>
                    <Tab label='Мои подписки' {...a11yProps(0)}/>
                    <Tab label='Новые' {...a11yProps(1)}/>
                    <Tab label='Лучшие' {...a11yProps(2)}/>
                </Tabs>
            </Container>
        </Paper>
    );
}

export default PostFilter;
