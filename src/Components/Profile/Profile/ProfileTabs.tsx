import {Container, Grid, Tab, Tabs} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {PostPage} from '../../Posts/PostPage/PostPage';
import {UsersPage} from '../../Users/UsersPage/UsersPage';
import TabPanel from '../../Common/Tabs/TabPanel';


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
            <Tabs value={tabIndex} onChange={handleTabChange} centered variant='fullWidth'>
                <Tab label={props.isOwner ? 'Мои посты' : 'Посты'} {...a11yProps(0)}/>
                {props.isOwner && <Tab label='Избранное' {...a11yProps(1)}/>}
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
            {props.isOwner && <TabPanel value={tabIndex} index={1}>
                <Grid container
                      direction='column'
                      justifyContent='space-between'
                      alignItems='stretch'>
                    <PostPage isOwner={props.isOwner} isMainPage={false}
                              userId={props.userId} isFavorite={true} isLoad={true}></PostPage>
                </Grid>
            </TabPanel>}
            <TabPanel value={tabIndex} index={2}>
                <Grid container
                      direction='column'
                      justifyContent='space-between'
                      alignItems='stretch'>
                    <UsersPage isMainPage={false}/>
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
