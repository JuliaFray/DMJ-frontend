import React, {useEffect, useState} from 'react';
import {Container, Tab, Tabs} from '@mui/material';
import Paper from '@mui/material/Paper';
import {useForm} from 'react-hook-form';
import {useSelector} from "react-redux";
import {getIsAuth} from "shared/model/auth/auth-selectors";
import styles from './home-tabs.module.scss';

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

export const HomeTabs: React.FC<IPostFilter> = (props, context) => {

    const isAuth = useSelector(getIsAuth);
    const [tabIndex, setTabIndex] = useState<number>(0);

    const {register, handleSubmit} = useForm({
        defaultValues: {search: ''},
        mode: 'onChange'
    });

    useEffect(() => {
        setTabIndex(0)
    }, [])

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabIndex(newValue);
        props.setTabIndex(newValue)
    };

    const handleFilterSubmit = (formData: any) => {
        props.setSearchValue(formData.search);
    }

    return (
        <Paper classes={{root: styles.root}}>
            {/*<form className={styles.filter} onSubmit={handleSubmit((values: any) => handleFilterSubmit(values))}>*/}
            {/*    <TextField*/}
            {/*        variant={'outlined'}*/}
            {/*        label='Поиск...'*/}
            {/*        {...register('search')}*/}
            {/*    />*/}
            {/*    <IconButton aria-label='start search' type={'submit'}>*/}
            {/*        <SearchIcon/>*/}
            {/*    </IconButton>*/}
            {/*</form>*/}

            <Container maxWidth='lg'>
                {isAuth && <Tabs value={tabIndex} onChange={handleTabChange} centered variant='fullWidth'>
                    <Tab label='Мои подписки' {...a11yProps(0)}/>
                    <Tab label='Новые' {...a11yProps(1)}/>
                    <Tab label='Лучшие' {...a11yProps(2)}/>
                </Tabs>}
                {!isAuth && <Tabs value={tabIndex} onChange={handleTabChange} centered variant='fullWidth'>
                    <Tab label='Новые' {...a11yProps(0)}/>
                    <Tab label='Лучшие' {...a11yProps(1)}/>
                </Tabs>}
            </Container>
        </Paper>
    );
}
