import React, {useEffect, useState} from 'react';
import {Container, Grid, Tab, Tabs} from '@mui/material';
import {HomePage} from "pages/home/home-page.ui";
import {UsersPage} from 'pages/users/users-page.ui';
import TabPanel from 'shared/ui/Tabs/TabPanel';
import {CommentsFeed} from 'widgets/comments-feed';


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
        <Container maxWidth="lg" sx={{margin: 0, padding: 0}}>
            <Tabs value={tabIndex} onChange={handleTabChange} centered variant='fullWidth'>
                <Tab label='Подписки' {...a11yProps(0)}/>
                <Tab label={props.isOwner ? 'Мои публикации' : 'Публикации'} {...a11yProps(1)}/>
                <Tab label={'Комментарии'} {...a11yProps(2)}/>
                {props.isOwner && <Tab label='Избранное' {...a11yProps(3)}/>}
            </Tabs>

            <TabPanel value={tabIndex} index={0}>
                <Grid container sx={{margin: 0, padding: 0}}
                      direction='column'
                      justifyContent='space-between'
                      alignItems='stretch'>
                    <UsersPage isMainPage={false} isFollowers={true}/>
                </Grid>
            </TabPanel>
            <TabPanel value={tabIndex} index={1}>
                <Grid container
                      direction='column'
                      justifyContent='space-between'
                      alignItems='stretch'>
                    <HomePage isOwner={true} isMainPage={false}
                              userId={props.userId} isFavorite={false} isLoad={true}></HomePage>
                </Grid>
            </TabPanel>
            <TabPanel value={tabIndex} index={2}>
                <Grid container
                      direction='column'
                      justifyContent='space-between'
                      alignItems='stretch'>
                    <CommentsFeed userId={props.userId}/>
                </Grid>
            </TabPanel>
            {props.isOwner && <TabPanel value={tabIndex} index={3}>
                <Grid container
                      direction='column'
                      justifyContent='space-between'
                      alignItems='stretch'>
                    <HomePage isOwner={props.isOwner} isMainPage={false}
                              userId={props.userId} isFavorite={true} isLoad={true}></HomePage>
                </Grid>
            </TabPanel>}
        </Container>
    );
}

const a11yProps = (index: number) => {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}
