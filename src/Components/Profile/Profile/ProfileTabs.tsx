import {Box, Container, Grid, Tab, Tabs} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {PostPage} from '../../Posts/PostPage';
import UsersPage from '../../Users/UsersPage';


export type IProfileTabs = {
    isOwner: boolean,
    userId: string,
}

export const ProfileTabs: React.FC<IProfileTabs> = (props, context) => {

    useEffect(() => {
        setTabIndex(0)
    }, [])
    const [tabIndex, setTabIndex] = useState<number>(0);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabIndex(newValue);
    };

    return (
        <Container maxWidth="lg">
            <Tabs value={tabIndex} onChange={handleTabChange} centered>
                <Tab label={props.isOwner ? 'Мои посты' : 'Посты'} {...a11yProps(0)}/>
                <Tab label='Избранное' {...a11yProps(1)}/>
                <Tab label='Друзья' {...a11yProps(2)}/>
            </Tabs>

            <TabPanel value={tabIndex} index={0}>
                <Grid container
                      direction='column'
                      justifyContent='space-between'
                      alignItems='stretch'>
                    <PostPage isOwner={props.isOwner} isMainPage={false}
                              userId={props.userId} isFavorite={false} isLoad={true}></PostPage>
                </Grid>
            </TabPanel>
            <TabPanel value={tabIndex} index={1}>
                <Grid container
                      direction='column'
                      justifyContent='space-between'
                      alignItems='stretch'>
                    <PostPage isOwner={props.isOwner} isMainPage={false}
                              userId={props.userId} isFavorite={true} isLoad={true}></PostPage>
                </Grid>
            </TabPanel>
            <TabPanel value={tabIndex} index={2}>
                <Grid container
                      direction='column'
                      justifyContent='space-between'
                      alignItems='stretch'>
                    <UsersPage/>
                </Grid>
            </TabPanel>
        </Container>
    );
}

const a11yProps = (index: number) => {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

type ITabPanel = {
    children?: React.ReactNode;
    index: number;
    value: number;
}

const TabPanel: React.FC<ITabPanel> = ({children, value, index, ...other}) => {

    return (
        <div
            role='tabpanel'
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (<Box sx={{p: 3}}>{children}</Box>)}
        </div>
    );
}
